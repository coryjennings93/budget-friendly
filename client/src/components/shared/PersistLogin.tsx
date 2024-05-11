import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// this component is used to refresh the access token before it gets to the RequireAuth component in the routes
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user, setAccessToken } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const { accessToken } = await refresh();
        console.log("Access Token from Persist Login", accessToken);
        if (accessToken) {
          setAccessToken(() => accessToken);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !user ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
};

export default PersistLogin;
