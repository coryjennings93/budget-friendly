import DashboardCategoryCard from "./DashboardCategoryCard";
import { useAuth } from "@/context/AuthContext";
import EditBudgetButton from "../shared/buttons/EditBudgetButton";
import { useEffect, useState } from "react";

const DashboardCategoriesSection = ({ height }) => {
  const { categoriesInBudget, selectedBudget } = useAuth();
  console.log("height in categories section: ", height);

  const [maxHeight, setMaxHeight] = useState(0);
  const [categoryContainerHeight, setCategoryContainerHeight] = useState(0);

  useEffect(() => {
    setCategoryContainerHeight(
      document.getElementById("category-container").offsetHeight
    );
  }, []);

  useEffect(() => {
    const calculateMaxHeight = () => {
      const categoryContainer =
        document.getElementById("category-container").offsetHeight;
      console.log("categoryContainer: ", categoryContainer);
      const cardHeaderHeight = document.getElementById(
        "category-card-header"
      ).offsetHeight;
      console.log("cardHeaderHeight: ", cardHeaderHeight);
      const remainingHeight = height - cardHeaderHeight - 17;
      setMaxHeight(remainingHeight);
    };

    calculateMaxHeight();
    window.addEventListener("resize", calculateMaxHeight);
    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, []);
  useEffect(() => {
    console.log("max height: ", maxHeight);
  }, [maxHeight]);

  return (
    <section className="" id="category-container">
      <div className="flex flex-row justify-between" id="category-card-header">
        <h3>Categories</h3>
        {selectedBudget ? <EditBudgetButton /> : null}
      </div>
      <div
        className="overflow-y-auto no-scrollbar"
        id="category-card-container"
        style={{ maxHeight: maxHeight }}
      >
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
                category={category}
                budgetAmount={category.budget_by_category_amount}
              />
            )
          )
        ) : (
          <>
            <div className="bg-gray-200 my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-gray-200 my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-gray-200 my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-gray-200 my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-gray-200 my-2 rounded p-2 h-[64px]"></div>
            <div className="bg-gray-200 my-2 rounded p-2 h-[64px]"></div>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardCategoriesSection;
