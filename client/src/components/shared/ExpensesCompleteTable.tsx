import { Button } from "../ui/button";
import CategoriesDropdown from "./CategoriesDropdown";
import ExpensesList from "./ExpensesList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ExpensesCompleteTable = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <CategoriesDropdown />
      </div>
      <ExpensesList />
    </>
  );
};

export default ExpensesCompleteTable;
