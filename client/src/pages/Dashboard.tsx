import LogoutButton from "@/components/shared/buttons/LogoutButton";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Transactions from "@/components/shared/Transactions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import useRefreshToken from "@/hooks/useRefreshToken";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import ExpensesCompleteTable from "@/components/shared/ExpensesCompleteTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useViewport } from "@/hooks/useViewport";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

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
      <DashboardHeader getHeight={handleNavBarHeight} />
      <div
        className="grid grid-cols-[minmax(0px,_1fr)_300px]"
        style={{ minHeight: remainingHeight }}
      >
        <div>
          <section>
            {user && <h2>Hi {user.name}!</h2>}
            {/* <Button onClick={() => refresh()}>Refresh Token</Button>
      <LogoutButton /> */}
            <section className="grid grid-cols-2">
              <article>
                <Button>Budget</Button>
              </article>
              <article>
                <div className="bg-rose-500 w-100 h-100">piechart</div>
              </article>
              <article className="col-span-2">
                <Transactions />
              </article>
            </section>
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
