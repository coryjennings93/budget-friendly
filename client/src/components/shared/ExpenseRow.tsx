import { TableCell, TableRow } from "../ui/table";
import { currencyFormatter } from "@/utils/utils";
import DeleteExpenseButton from "./DeleteExpenseButton";
import EditExpenseButton from "./EditExpenseButton";

const ExpenseRow = ({ expense }) => {
  return (
    <TableRow key={expense.id}>
      <TableCell className="font-medium">{expense.date}</TableCell>
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
