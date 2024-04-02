import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContextProvider User: ", user);
  }, [user]);

  // verify that there is a valid access token when the page loads
  useEffect(() => {
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
  }, []);

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

  // useEffect(() => {
  //   if (!user) {
  //     // this gets the user account details from the server
  //     fetch("http://localhost:4000/api/v1/returnAccessToken", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response);
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         throw response;
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         const decoded = jwtDecode<JwtPayload>(data.accessToken);
  //         console.log(decoded);
  //         const createUser = {
  //           id: decoded.user_account_id,
  //           name: decoded.user_account_name,
  //           email: decoded.user_account_email,
  //         };
  //         setAccessToken(data.accessToken);
  //         setUser(createUser);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   setLoading(false);
  // }, [accessToken, loading]);

  // useEffect(() => {
  //   if (!user) {
  //     // this gets the user account details from the server
  //     fetch("http://localhost:4000/api/v1/profile", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response);
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         throw response;
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         setUser(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  // //   call this function when you want to authenticate the user
  //     const login = async (data) => {
  //       setUser(data);
  //       Navigate("/profile");
  //     };

  // //   call this function to sign out logged in user
  //     const logout = () => {
  //       setUser(null);
  //       navigate("/", { replace: true });
  //     };

  //     const value = useMemo(
  //       () => ({
  //         user,
  //         login,
  //         logout,
  //       }),
  //       [user]
  //     );

  // useEffect(() => {
  //   if (accessToken) {
  //     const decoded = jwtDecode<JwtPayload>(accessToken);
  //     const createUser = {
  //       id: decoded.user_account_id,
  //       name: decoded.user_account_name,
  //       email: decoded.user_account_email,
  //     };
  //     setUser(createUser);
  //   }
  //   setLoading(false);
  // }, [accessToken, loading]);
  // useEffect(() => {
  //   console.log("user: ", user);
  // }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser }}>
      {loading ? null : children}
      {/* {children} */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
