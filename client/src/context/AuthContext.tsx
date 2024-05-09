import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";
import { useCategories } from "@/hooks/useCategories";
import { useBudgets } from "@/hooks/useBudgets";

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
  // const { categories, setCategories } = useCategories();
  const [transactions, setTransactions] = useState(null);
  // const { budgets, setBudgets } = useBudgets();
  const [budgets, setBudgets] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState<SelectedBudget | null>(
    null
  );
  const [categoriesInBudget, setCategoriesInBudget] = useState(null);
  const [transactionsPerBudget, setTransactionsPerBudget] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(false);

  const axiosPrivate = useAxiosAuthInstance();

  // useEffect(() => {
  //   console.log("AuthContextProvider budgets: ", budgets);
  // }, []);

  // useEffect(() => {
  //   console.log("AuthContextProvider user: ", user);
  // }, []);

  // useEffect(() => {
  //   console.log("AuthContextProvider categories: ", categories);
  // }, [categories]);

  // useEffect(() => {
  //   console.log("AuthContextProvider transactions: ", transactions);
  // }, [transactions]);

  // useEffect(() => {
  //   if (selectedBudget) {
  //     const fetchCategoriesInBudget = async () => {
  //       try {
  //         const categoriesResponse = await axiosPrivate.get(
  //           `/api/v1/budgets/${selectedBudget.monthly_budget_id}/categories`
  //         );
  //         if (categoriesResponse.statusText === "OK") {
  //           const categoriesData = await categoriesResponse.data;
  //           console.log(
  //             "categoriesInBudgetDataFromAuthContext: ",
  //             categoriesData
  //           );
  //           // setCategoriesInBudget(categoriesData);
  //         } else {
  //           console.log("Error fetching categories: ", categoriesResponse);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching categories: ", error);
  //       }
  //     };
  //     fetchCategoriesInBudget();
  //   }
  // }, [selectedBudget]);

  // verify that there is a valid access token when the page loads
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        await fetch("http://localhost:4000/api/v1/verifyAccessToken", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            if (data.accessToken) {
              setAccessToken(data.accessToken);
              const decoded = jwtDecode<JwtPayload>(data.accessToken);
              const createUser = {
                id: decoded.user_account_id,
                name: decoded.user_account_name,
                email: decoded.user_account_email,
              };
              setUser(createUser);
            }
          })
          .catch((error) => {
            console.error(error);
            setUser(null);
          })
          .finally(() => {
            setLoading(false);
          });
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  // find out if there is an authenticated user when page refreshes
  useEffect(() => {
    const isUserAuthenticated = async () => {
      try {
        const checkAuthentication = await axiosPrivate.get(
          "/api/v1/authenticated"
        );
        console.log("checkAuthentication: ", checkAuthentication);
        if (checkAuthentication.statusText === "OK") {
          setAuthenticatedUser(true);
          // set user again
          const accessToken = checkAuthentication.data.accessToken;

          // define user
          const decoded = jwtDecode<JwtPayload>(accessToken);
          console.log("decoded Token: ", decoded);
          const createUser = {
            id: decoded.user_account_id,
            name: decoded.user_account_name,
            email: decoded.user_account_email,
          };
          setUser(createUser);
          await fetchUserData();
          setLoading(false);
        } else {
          console.log("Error verifying authentication: ", checkAuthentication);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error verifying authentication: ", error);
        setLoading(false);
      }
    };
    isUserAuthenticated();
  }, []);

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

  // useEffect(() => {
  //   if (user) {
  //     const fetchUserData = async () => {
  //       try {
  //         const budgetsResponse = await axiosPrivate.get("/api/v1/budgets");
  //         if (budgetsResponse.statusText === "OK") {
  //           const budgetsData = await budgetsResponse.data;
  //           console.log("budgetsData: ", budgetsData);
  //           setBudgets(budgetsData);
  //         } else {
  //           console.log("Error fetching budgets: ", budgetsResponse);
  //         }
  //         const categoriesResponse = await axiosPrivate.get(
  //           "/api/v1/categories"
  //         );
  //         if (categoriesResponse.statusText === "OK") {
  //           const categoriesData = await categoriesResponse.data;
  //           console.log("categoriesData: ", categoriesData);
  //           setCategories(categoriesData);
  //         } else {
  //           console.log("Error fetching categories: ", categoriesResponse);
  //         }
  //         const transactionsResponse = await axiosPrivate.get(
  //           "/api/v1/transactions"
  //         );
  //         if (transactionsResponse.statusText === "OK") {
  //           const transactionsData = await transactionsResponse.data;
  //           console.log("transactionsData: ", transactionsData);
  //           setTransactions(transactionsData);
  //         } else {
  //           console.log("Error fetching transactions: ", transactionsResponse);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data: ", error);
  //       }
  //     };
  //     fetchUserData();
  //     console.log("userDataFetched");
  //     setLoading(false);
  //   } else {
  //     setBudgets(null);
  //     setCategories(null);
  //     setTransactions(null);
  //     setLoading(false);
  //   }
  // }, [user]);

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
        }
        throw response;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // get the user categories when logged in
  // useEffect(() => {
  //   if (user) {
  //     axiosPrivate
  //       .get("/api/v1/categories")
  //       .then((response) => {
  //         setCategories(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setCategories([]);
  //       });
  //   } else {
  //     setCategories([]);
  //   }
  // }, [user]);

  // get the user's transactions when logged in
  // useEffect(() => {
  //   if (user) {
  //     axiosPrivate
  //       .get("/api/v1/transactions")
  //       .then((response) => {
  //         setTransactions(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setTransactions([]);
  //       });
  //   } else {
  //     setTransactions([]);
  //   }
  // }, [user]);

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
      }}
    >
      {loading ? null : children}
      {/* {children} */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
