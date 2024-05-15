import { TableCell, TableRow } from "../ui/table";
import { currencyFormatter, dateFormatter } from "@/utils/utils";
import DeleteExpenseButton from "./DeleteExpenseButton";
import EditExpenseButton from "./EditExpenseButton";
import { useAuth } from "@/context/AuthContext";

const TransactionRow = ({ expense }) => {
  const { categoriesInBudget } = useAuth();
  // console.log("TransactionRow expense", expense);
  // console.log("categoriesInBudget from TransactionRow", categoriesInBudget);

  if (!categoriesInBudget) {
    return (
      <TableRow>
        <TableCell className="font-medium"></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell className="text-right"></TableCell>
        <TableCell className=""></TableCell>
      </TableRow>
    );
  }

  const category = categoriesInBudget.find(
    (element: {
      budget_by_category_amount: number;
      category_id: number;
      category_name: string;
      monthly_budget_id: number;
    }) => element.category_id === expense.category_id
  );
  console.log("category from TransactionRow", category);
  const category_name = category.category_name;
  // date gets strigified and parsed back as string through saving in local storage and it needs to be in Date format
  if (typeof expense.transaction_date === "string") {
    expense.transaction_date = new Date(expense.transaction_date);
  }
  return (
    <TableRow key={expense.transaction_id}>
      <TableCell className="font-medium">
        {dateFormatter(expense.transaction_date)}
      </TableCell>
      <TableCell>{category_name}</TableCell>
      <TableCell>{expense.transaction_description}</TableCell>
      <TableCell className="text-right">
        {currencyFormatter.format(expense.transaction_amount)}
      </TableCell>
      <TableCell className="">
        <div className="flex gap-2">
          <EditExpenseButton expense={expense} />
          <DeleteExpenseButton expense={expense} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
