import AddCategory from "./AddCategory";
import CategoriesDropdown from "./CategoriesDropdown";
import ExpensesList from "./ExpensesList";

const ExpensesCompleteTable = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <CategoriesDropdown />
        <AddCategory />
      </div>
      <ExpensesList />
    </>
  );
};

export default ExpensesCompleteTable;
