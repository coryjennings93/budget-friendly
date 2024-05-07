import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const RequireAuth = () => {
  const { user, authenticatedUser } = useAuth();
  const location = useLocation();
  console.log("fromRequireAuth: ", "user: ", user, "location: ", location);

  return authenticatedUser || user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
