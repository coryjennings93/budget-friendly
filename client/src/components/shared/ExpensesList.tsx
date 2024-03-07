import { currencyFormatter } from "@/utils/utils";
import { useExpensesDemo } from "../../context/ExpensesDemoContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpenseRow from "./ExpenseRow";
import { MEDIUM_SCREEN_SIZE } from "@/utils/constants";
import { useViewport } from "@/hooks/useViewport";
import ExpenseCard from "./ExpenseCard";

const ExpensesList = () => {
  const { expenses, total, isChecked, filteredByDate } = useExpensesDemo();
  const { width } = useViewport();
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (width >= MEDIUM_SCREEN_SIZE) {
    return (
      <div className="flex items-center justify-center ">
        <Table className="max-w-screen-md mx-1 border-4 rounded-lg bg-gray-50 border-slate-50">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="w-[132.25px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) =>
              // filteredByDate.length === 0 && isChecked.length === 0 ? (
              //   <ExpenseRow expense={expense} />
              // ) : (
              //   filteredByDate.includes(expense.id) && isChecked.lenght === 0 ? (
              //     <ExpenseRow expense={expense} />
              //   )
              // )
              // filteredByDate.length > 0 ? (
              //   filteredByDate.includes(expense.date) && (
              //     <ExpenseRow expense={expense} />
              //   )
              // ) : (
              //   <ExpenseRow expense={expense} />
              // )

              isChecked.length === 0 ? (
                <ExpenseRow expense={expense} />
              ) : (
                isChecked.includes(expense.category) && (
                  <ExpenseRow expense={expense} />
                )
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="w-[100px]"></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <b>Total:</b>
              </TableCell>
              <TableCell className="text-right">
                {currencyFormatter.format(total)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
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
  } else {
    return (
      <div className="mx-1 border-2 divide-y rounded-md divide-slate-900 border-slate-900">
        {expenses.map((expense) =>
          isChecked.length === 0 ? (
            <ExpenseCard expense={expense} />
          ) : (
            isChecked.includes(expense.category) && (
              <ExpenseCard expense={expense} />
            )
          )
        )}
        <div className="flex items-center justify-center p-2">
          <p>
            <b>Total:</b> {currencyFormatter.format(total)}
          </p>
        </div>
      </div>
    );
  }
};

export default ExpensesList;
