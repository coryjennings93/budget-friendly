import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";

type User = {
  id: number;
  name: string;
  email: string;
};

type SelectedBudget = {
  monthly_budget_amount: number;
  monthly_budget_date_created: string;
  monthly_budget_id: number;
  monthly_budget_month: string;
  monthly_budget_name: string;
  monthly_budget_year: string;
  user_account_id: number;
};

interface AuthContextProviderProps {
  children: ReactNode;
  // any props that come into the component
}

const AuthContext = createContext();

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [categories, setCategories] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [budgets, setBudgets] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState<SelectedBudget | null>(
    null
  );
  const [categoriesInBudget, setCategoriesInBudget] = useState(null);
  const [transactionsPerBudget, setTransactionsPerBudget] = useState(null);
  const [filteredTransactionsPerBudget, setFilteredTransactionsPerBudget] =
    useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [logoutTimer, setLogoutTimer] =
    useState<() => ReturnType<typeof setTimeout> | null>(null);

  const axiosPrivate = useAxiosAuthInstance();

  const refreshTokenExpiry: number = 6000000; // 100 minutes

  useEffect(() => {
    console.log("accessToken: ", accessToken);
  }, [accessToken]);

  useEffect(() => {
    console.log("user after being set by accessToken being set: ", user);
  }, [user]);

  // create user when an access token is set
  useEffect(() => {
    if (accessToken) {
      const createUserData = async () => {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const createUser = {
          id: decoded.user_account_id,
          name: decoded.user_account_name,
          email: decoded.user_account_email,
        };
        setUser(createUser);
        await fetchUserData();
      };
      createUserData();
    }
  }, [accessToken]);

  // set a timer to auto log the user out if the refresh token expires; the refresh token gets refreshed every time the access token does
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    console.log("timer set");
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      console.log("runnings timer");
      logoutUser();
    }, refreshTokenExpiry);
    // Store the timer in state to clear it when component unmounts

    setLogoutTimer(logoutTimer);

    return () => clearTimeout(timer);
  }, [accessToken]);

  // verify that there is a valid access token when the page loads
  // useEffect(() => {
  //   if (user) {
  //     const fetchData = async () => {
  //       await fetch("http://localhost:4000/api/v1/verifyAccessToken", {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //         .then((response) => {
  //           if (response.ok) {
  //             return response.json();
  //           }
  //           throw response;
  //         })
  //         .then((data) => {
  //           if (data.accessToken) {
  //             setAccessToken(data.accessToken);
  //             const decoded = jwtDecode<JwtPayload>(data.accessToken);
  //             const createUser = {
  //               id: decoded.user_account_id,
  //               name: decoded.user_account_name,
  //               email: decoded.user_account_email,
  //             };
  //             setUser(createUser);
  //           }
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           setUser(null);
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     };
  //     fetchData();
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  // find out if there is an authenticated user when page refreshes
  // useEffect(() => {
  //   const isUserAuthenticated = async () => {
  //     try {
  //       const checkAuthentication = await axiosPrivate.get(
  //         "/api/v1/authenticated"
  //       );
  //       if (checkAuthentication?.statusText === "OK") {
  //         setAuthenticatedUser(true);
  //         // set user again
  //         const accessToken = checkAuthentication.data.accessToken;
  //         setAccessToken(accessToken);

  //         await fetchUserData();
  //         setLoading(false);
  //       } else {
  //         console.log("Error verifying authentication: ", checkAuthentication);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error verifying authentication: ", error);
  //       setLoading(false);
  //     }
  //   };
  //   isUserAuthenticated();
  // }, []);

  const fetchUserData = async () => {
    try {
      const budgetsResponse = await axiosPrivate.get("/api/v1/budgets");
      if (budgetsResponse.statusText === "OK") {
        const budgetsData = await budgetsResponse.data;
        console.log("budgetsData: ", budgetsData);
        setBudgets(budgetsData);
      } else {
        console.log("Error fetching budgets: ", budgetsResponse);
      }
      const categoriesResponse = await axiosPrivate.get("/api/v1/categories");
      if (categoriesResponse.statusText === "OK") {
        const categoriesData = await categoriesResponse.data;
        console.log("categoriesData: ", categoriesData);
        setCategories(categoriesData);
      } else {
        console.log("Error fetching categories: ", categoriesResponse);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data: ", error);
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    fetch("http://localhost:4000/api/v1/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          setAccessToken(null);
        }
        throw response;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // function to help with filtering the transactions by category
  const filterTransactionsByCategory = (categoryIDArray) => {
    console.log("categoryIDArray: ", categoryIDArray);
    if (!transactionsPerBudget) {
      return [];
    }
    if (categoryIDArray.length === 0) {
      setFilteredTransactionsPerBudget([]);
      return [];
    }
    const filteredTransactions = [];

    transactionsPerBudget.forEach((transaction) => {
      if (categoryIDArray.includes(transaction.category_id)) {
        filteredTransactions.push(transaction);
      }
    });
    console.log("filteredTransactions: ", filteredTransactions);
    // for (let i = 0; i < categoryIDArray.length; i++) {
    //   const filteredTransactions = transactionsPerBudget.filter(
    //     (transaction) => transaction.category_id === categoryIDArray[i]
    //   );
    // filteredTransactions = transactionsPerBudget.map((transaction) => {
    //   if (transaction.category_id === categoryIDArray[i]) {
    //     setFilteredTransactionsPerBudget((prevState) => [
    //       ...prevState,
    //       transaction,
    //     ]);
    //   }
    // });
    setFilteredTransactionsPerBudget(filteredTransactions);

    // const filteredTransactions = transactionsPerBudget.filter(
    //   (transaction) => transaction.category_id === categoryID
    // );
    // setFilteredTransactionsPerBudget(filteredTransactions);
    return filteredTransactions;
  };

  useEffect(() => {
    console.log(
      "filteredTransactionsPerBudget: ",
      filteredTransactionsPerBudget
    );
  }, [filteredTransactionsPerBudget]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logoutUser,
        accessToken,
        setAccessToken,
        setBudgets,
        transactions,
        budgets,
        categories,
        setCategories,
        fetchUserData,
        selectedBudget,
        setSelectedBudget,
        categoriesInBudget,
        setCategoriesInBudget,
        authenticatedUser,
        transactionsPerBudget,
        setTransactionsPerBudget,
        filteredTransactionsPerBudget,
        setFilteredTransactionsPerBudget,
        filterTransactionsByCategory,
      }}
    >
      {/* {loading ? null : children} */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
