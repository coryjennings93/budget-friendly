import { TableCell, TableRow } from "../ui/table";
import { currencyFormatter } from "@/utils/utils";

const ExpenseRow = ({ expense }) => {
  return (
    <TableRow key={expense.id}>
      <TableCell className="font-medium">{expense.date}</TableCell>
      <TableCell>{expense.category}</TableCell>
      <TableCell>{expense.descriptionOrLocation}</TableCell>
      <TableCell className="text-right">
        {currencyFormatter.format(expense.cost)}
      </TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
