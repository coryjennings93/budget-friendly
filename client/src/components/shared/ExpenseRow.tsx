import { TableCell, TableRow } from "../ui/table";
import { currencyFormatter } from "@/utils/utils";
import DeleteExpenseButton from "./DeleteExpenseButton";
import EditExpenseButton from "./EditExpenseButton";

const ExpenseRow = ({ expense }) => {
  return (
    <TableRow key={expense.id}>
      <TableCell className="font-medium">{expense.date}</TableCell>
      <TableCell>{expense.category}</TableCell>
      <TableCell>{expense.descriptionOrLocation}</TableCell>
      <TableCell className="text-right">
        {currencyFormatter.format(expense.cost)}
      </TableCell>
      <TableCell>
        <div className="object-right">
          <EditExpenseButton expense={expense} />
          <DeleteExpenseButton expense={expense} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
