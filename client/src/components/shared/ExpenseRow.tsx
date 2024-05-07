import { TableCell, TableRow } from "../ui/table";
import { currencyFormatter, dateFormatter } from "@/utils/utils";
import DeleteExpenseButton from "./DeleteExpenseButton";
import EditExpenseButton from "./EditExpenseButton";

const ExpenseRow = ({ expense }) => {
  // date gets strigified and parsed back as string through saving in local storage and it needs to be in Date format
  if (typeof expense.date === "string") {
    expense.date = new Date(expense.date);
  }
  return (
    <TableRow key={expense.id}>
      <TableCell className="font-medium">
        {dateFormatter(expense.date)}
      </TableCell>
      <TableCell>{expense.category}</TableCell>
      <TableCell>{expense.transactionDescription}</TableCell>
      <TableCell className="text-right">
        {currencyFormatter.format(expense.cost)}
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

export default ExpenseRow;
