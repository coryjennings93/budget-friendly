import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import AddCategory from "./AddCategory";
import AddExpense from "./AddExpense";
import CategoriesDropdownAuth from "./CategoriesDropdownAuth";
import DeleteCategoryButton from "./DeleteCategoryButton";
import ExpensesList from "./ExpensesList";
import FilterByDateButton from "./FilterByDateButton";
import TransactionList from "./TransactionList";

const Transactions = () => {
  const { user, transactionsPerBudget, categoriesInBudget, categories } =
    useAuth();

  if (!transactionsPerBudget || !categoriesInBudget || !categories) {
    return <h1>Loading Data...</h1>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        {/* <div className="flex max-w-[768px] w-full gap-1 mt-1 px-1">
          <div>
            <CategoriesDropdownAuth />
          </div>
          
          <div>
            <FilterByDateButton />
          </div>

          <div className="ml-auto">
            <AddExpense />
          </div>
        </div> */}
      </div>
      {user ? <TransactionList /> : <ExpensesList />}
    </div>
  );
};

export default Transactions;
