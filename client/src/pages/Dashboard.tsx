import LogoutButton from "@/components/shared/buttons/LogoutButton";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Transactions from "@/components/shared/Transactions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import useRefreshToken from "@/hooks/useRefreshToken";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import NavBar from "@/components/shared/NavBar";
import ExpensesCompleteTable from "@/components/shared/ExpensesCompleteTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useViewport } from "@/hooks/useViewport";

const Dashboard = () => {
  const { user } = useAuth();
  const refresh = useRefreshToken();
  const { height } = useViewport();

  const [navBarHeight, setNavBarHeight] = useState(null);
  const [remainingHeight, setRemainingHeight] = useState(null);

  const handleNavBarHeight = (height: number) => {
    setNavBarHeight(height);
  };

  useEffect(() => {
    setRemainingHeight(height - navBarHeight);
  }, [height, navBarHeight]);

  return (
    <div className="">
      <NavBar getHeight={handleNavBarHeight} />
      <div
        className="grid grid-cols-[minmax(0px,_1fr)_300px]"
        style={{ minHeight: remainingHeight }}
      >
        <div>
          <section></section>
          {user && <h2>Hi {user.name}!</h2>}
          {/* <Button onClick={() => refresh()}>Refresh Token</Button>
      <LogoutButton /> */}
          <section>
            <div>
              <div>budgetSelector</div>
            </div>
          </section>
          <section>
            <div>PieChart</div>
          </section>
          <section>
            <Transactions />
          </section>
        </div>
        <div className=" bg-slate-500">
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
