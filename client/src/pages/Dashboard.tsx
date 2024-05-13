import { Toaster } from "@/components/ui/toaster";
import LogoutButton from "@/components/shared/buttons/LogoutButton";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Transactions from "@/components/shared/Transactions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import ExpensesCompleteTable from "@/components/shared/ExpensesCompleteTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useViewport } from "@/hooks/useViewport";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SelectBudgetButton from "@/components/shared/buttons/SelectBudgetButton";
import CreateBudgetForm from "@/components/shared/buttons/CreateBudgetButton";
import PieChart from "@/components/shared/charts/PieChart";

const Dashboard = () => {
  const {
    user,
    transactions,
    categories,
    budgets,
    selectedBudget,
    categoriesInBudget,
  } = useAuth();
  const { height } = useViewport();

  const [navBarHeight, setNavBarHeight] = useState(null);
  const [remainingHeight, setRemainingHeight] = useState(null);

  const handleNavBarHeight = (height: number) => {
    setNavBarHeight(height);
  };

  useEffect(() => {
    setRemainingHeight(height - navBarHeight);
  }, [height, navBarHeight]);

  if (!budgets || !categories) {
    // Render a loading indicator or placeholder until all data is fetched
    return <h1>Loading Data...</h1>;
  }

  if (selectedBudget && !categoriesInBudget) {
    return <h1>Loading Data...</h1>;
  }

  return (
    <>
      <div className="">
        <DashboardHeader getHeight={handleNavBarHeight} />
        <div
          className="grid grid-cols-[minmax(0px,_1fr)_300px]"
          style={{ minHeight: remainingHeight }}
        >
          <div>
            <section>
              {user && <h2>Hi {user.name}!</h2>}

              <section className="grid grid-cols-2">
                <article className="flex gap-1">
                  <SelectBudgetButton />
                  <CreateBudgetForm />
                  {selectedBudget && (
                    <div>
                      <p>{selectedBudget.monthly_budget_name}</p>
                      <p>Total: ${selectedBudget.monthly_budget_amount}</p>
                    </div>
                  )}
                </article>
                <article className="border-blue-200 border-2 rounded pb-3 pt-1 mr-2">
                  <PieChart />
                </article>
                <article className="col-span-2">
                  {selectedBudget && <Transactions />}
                </article>
              </section>
            </section>
          </div>
          <div className=" bg-slate-500">
            <DashboardSidebar />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Dashboard;
