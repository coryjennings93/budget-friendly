import AddExpense from "./AddExpense";
import CategoriesDropdown from "./CategoriesDropdown";
import ExpensesList from "./ExpensesList";

const ExpensesCompleteTable = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <CategoriesDropdown />
        <AddExpense />
      </div>
      <ExpensesList />
    </>
  );
};

export default ExpensesCompleteTable;
