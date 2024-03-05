import { currencyFormatter } from "@/utils/utils";
import { useExpensesDemo } from "../../context/ExpensesDemoContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpenseRow from "./ExpenseRow";

const ExpensesList = () => {
  const { expenses, total, isChecked } = useExpensesDemo();
  // console.log(expenses, total, isChecked);

  return (
    <div className="flex items-center justify-center ">
      <Table className="max-w-screen-md mx-1 border-4 rounded-lg bg-gray-50 border-slate-50">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) =>
            isChecked.length === 0 ? (
              <ExpenseRow expense={expense} />
            ) : (
              isChecked.includes(expense.category) && (
                <ExpenseRow expense={expense} />
              )
            )
          )}
          <TableRow>
            <TableCell className="w-[100px]"></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <b>Total:</b>
            </TableCell>
            <TableCell className="text-right">
              {currencyFormatter.format(total)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    // <div className="flex items-center justify-center ">
    //   <table className="">
    //     <thead className="">
    //       <tr>
    //         <th>Date</th>
    //         <th>Category</th>
    //         <th>Location</th>
    //         <th>Cost</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {expenses.map((expense) => (
    //         <tr key={expense.id}>
    //           <td>{expense.date}</td>
    //           <td>{expense.category}</td>
    //           <td>{expense.location}</td>
    //           <td>{expense.cost}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default ExpensesList;
