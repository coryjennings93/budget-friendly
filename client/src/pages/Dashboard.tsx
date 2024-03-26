import DashboardSidebar from "@/components/shared/DashboardSidebar";
import Transactions from "@/components/shared/Transactions";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <DashboardSidebar />
      <Transactions />
      {user && <h2>Hi {user.user_account_name}!</h2>}
    </div>
  );
};

export default Dashboard;
