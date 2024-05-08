import DashboardCategoryCard from "./DashboardCategoryCard";
import { useAuth } from "@/context/AuthContext";
import EditBudgetButton from "../shared/buttons/EditBudgetButton";

const DashboardCategoriesSection = () => {
  const { categoriesInBudget, selectedBudget } = useAuth();

  return (
    <section className="p-2 m-2 border-2 rounded border-slate-500">
      <div className="flex flex-row justify-between">
        <h3>Categories</h3>
        {selectedBudget ? <EditBudgetButton /> : null}
      </div>
      <div className="h-[300px] overflow-y-scroll scroller">
        {categoriesInBudget && categoriesInBudget.length > 0 ? (
          categoriesInBudget.map(
            (category: {
              budget_by_category_amount: number;
              category_id: number;
              category_name: string;
              user_account_id: number;
            }) => (
              <DashboardCategoryCard
                key={category.category_id}
                category={category.category_name}
                budgetAmount={category.budget_by_category_amount}
              />
            )
          )
        ) : (
          <>
            <div className="bg-[rgb(255,246,210)] my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-[rgb(255,246,210)] my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-[rgb(255,246,210)] my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-[rgb(255,246,210)] my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-[rgb(255,246,210)] my-2 rounded p-2 h-[64px]"></div>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardCategoriesSection;
