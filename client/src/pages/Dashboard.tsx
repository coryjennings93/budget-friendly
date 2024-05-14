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
import LineChart from "@/components/shared/charts/LineChart";
import EditBudgetButton from "@/components/shared/buttons/EditBudgetButton";

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

  const [navBarHeight, setNavBarHeight] = useState<number | null>(null);
  const [remainingHeight, setRemainingHeight] = useState<number | null>(null);

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
        {!selectedBudget ? (
          <section
            style={{ minHeight: remainingHeight }}
            className="flex flex-col  items-center gap-2"
          >
            {user && (
              <h2 className="my-4">
                Hi {user.name}! Please select or create a budget.
              </h2>
            )}

            <article className="flex gap-1 justify-center items-center mt-3">
              <SelectBudgetButton />
              <CreateBudgetForm />
              <EditBudgetButton
                handleIsOpen={null}
                fromAddTransaction={false}
              />
            </article>
          </section>
        ) : (
          <div
            className="grid grid-cols-[minmax(0px,_1fr)_300px]"
            style={{ minHeight: remainingHeight }}
          >
            <div>
              <section className="grid grid-cols-2 gap-2 ">
                <article className="flex-col gap-1 justify-center items-center pt-3 ml-2 mt-1 border-blue-200 border-2 rounded shadow-md bg-gradient-to-r from-emerald-200 to-teal-200">
                  {selectedBudget && (
                    <div className="flex justify-center">
                      <div>
                        <h3>{selectedBudget.monthly_budget_name}</h3>
                        <p>
                          Total Budgeted: $
                          {selectedBudget.monthly_budget_amount}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-1 justify-center items-center mt-3">
                    <SelectBudgetButton />
                    <CreateBudgetForm />
                  </div>{" "}
                </article>
                <article
                  className="border-blue-200 border-2 rounded pb-3 pt-1 mr-2 mt-1 shadow-md
                "
                >
                  <LineChart />
                </article>
                {selectedBudget && (
                  <article className="col-span-2 border-2 border-blue-200 rounded mx-2 pb-2 mb-2 shadow-md">
                    <Transactions />
                  </article>
                )}
              </section>
            </div>
            <div className="  ">
              <DashboardSidebar height={remainingHeight} />
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Dashboard;
