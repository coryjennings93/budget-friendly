import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const LogoutButton = () => {
  const { logoutUser } = useAuth();

  return <Button onClick={() => logoutUser()}>Logout</Button>;
};

export default LogoutButton;
