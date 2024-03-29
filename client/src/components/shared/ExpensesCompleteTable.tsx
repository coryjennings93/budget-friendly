import { Button } from "../ui/button";
import AddCategory from "./AddCategory";
import AddExpense from "./AddExpense";
import CategoriesDropdown from "./CategoriesDropdown";
import DeleteCategoryButton from "./DeleteCategoryButton";
import ExpensesList from "./ExpensesList";
import FilterByDateButton from "./FilterByDateButton";

const ExpensesCompleteTable = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[768px] w-full gap-1 my-1">
          <div>
            <CategoriesDropdown />
          </div>
          <div>
            <AddCategory />
          </div>
          <div>
            <DeleteCategoryButton />
          </div>
          <div>
            <FilterByDateButton />
          </div>

          <div className="ml-auto">
            <AddExpense />
          </div>
        </div>
      </div>
      <ExpensesList />
    </div>
  );
};

export default ExpensesCompleteTable;
