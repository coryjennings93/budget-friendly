import { Toaster } from "@/components/ui/toaster";
import LogoutButton from "@/components/shared/buttons/LogoutButton";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Transactions from "@/components/shared/Transactions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import ExpensesCompleteTable from "@/components/shared/ExpensesCompleteTable";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useViewport } from "@/hooks/useViewport";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SelectBudgetButton from "@/components/shared/buttons/SelectBudgetButton";
import CreateBudgetForm from "@/components/shared/buttons/CreateBudgetButton";
import PieChart from "@/components/shared/charts/PieChart";
import LineChart from "@/components/shared/charts/LineChart";
import EditBudgetButton from "@/components/shared/buttons/EditBudgetButton";
import CategoriesDropdownAuth from "@/components/shared/CategoriesDropdownAuth";
import AddExpense from "@/components/shared/AddExpense";

const Dashboard = () => {
  const {
    user,
    transactions,
    categories,
    budgets,
    selectedBudget,
    categoriesInBudget,
  } = useAuth();
  const dashRef = useRef(null);
  const { height } = useViewport();

  const [navBarHeight, setNavBarHeight] = useState<number | null>(null);
  const [remainingHeight, setRemainingHeight] = useState<number | null>(null);

  const handleNavBarHeight = (height: number) => {
    setNavBarHeight(height);
  };

  useEffect(() => {
    setRemainingHeight(height - navBarHeight);
  }, [height, navBarHeight]);

  useEffect(() => {
    console.log("DashRef: ", dashRef);
  }, []);

  if (!budgets || !categories) {
    // Render a loading indicator or placeholder until all data is fetched
    return <h1>Loading Data...</h1>;
  }

  if (selectedBudget && !categoriesInBudget) {
    return <h1>Loading Data...</h1>;
  }

  // used to get the entire height of components including margins
  // const componentHeightWithMargins = (el) => {
  //   let height = el.offsetHeight;
  //   const style = window.getComputedStyle(el);
  //   height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  //   return height;
  // };

  // console.log("Computed Height: ", componentHeightWithMargins(DashboardHeader));

  return (
    <>
      <div className="overflow-hidden">
        <div ref={dashRef}>
          <DashboardHeader getHeight={handleNavBarHeight} />
        </div>
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
            </article>
          </section>
        ) : (
          <div
            className="grid grid-cols-[minmax(0px,_1fr)_300px] pr-2"
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
                    <EditBudgetButton
                      handleIsOpen={null}
                      fromAddTransaction={false}
                    />
                  </div>{" "}
                  <div className="flex max-w-[768px] w-full gap-1 mt-1 px-1 justify-center">
                    <div>
                      <CategoriesDropdownAuth />
                    </div>

                    <div className="">
                      <AddExpense />
                    </div>
                  </div>
                </article>
                <article
                  className="border-blue-200 border-2 rounded pb-3 pt-1 mr-2 mt-1 shadow-md
                "
                >
                  <LineChart />
                </article>
                {selectedBudget && (
                  <article className="col-span-2 border-2 border-blue-200 rounded mx-2  mb-2 shadow-md">
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
