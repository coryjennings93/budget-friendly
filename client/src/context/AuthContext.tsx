import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      fetch("/api/v1/profile")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          console.log(data);
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // call this function when you want to authenticate the user
  //   const login = async (data) => {
  //     setUser(data);
  //     navigate("/profile");
  //   };

  // call this function to sign out logged in user
  //   const logout = () => {
  //     setUser(null);
  //     navigate("/", { replace: true });
  //   };

  //   const value = useMemo(
  //     () => ({
  //       user,
  //       login,
  //       logout,
  //     }),
  //     [user]
  //   );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
