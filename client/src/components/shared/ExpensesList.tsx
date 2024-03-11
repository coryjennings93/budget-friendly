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
  const { expenses, total, isChecked, filteredByDate, dateFilter } =
    useExpensesDemo();
  const { width } = useViewport();
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filteredByDate.length > 0) {
  }

  const renderExpense = (expense) => {
    // console.log(filteredByDate);
    // console.log(expense.id);

    if (filteredByDate.length === 0 && isChecked.length === 0) {
      if (!dateFilter) {
        return <ExpenseRow expense={expense} />;
      }
      return;
    } else if (
      filteredByDate.length === 0 &&
      isChecked.includes(expense.category)
    ) {
      return <ExpenseRow expense={expense} />;
    } else if (isChecked.length === 0 && filteredByDate.includes(expense)) {
      return <ExpenseRow expense={expense} />;
    } else {
      return (
        filteredByDate.includes(expense) &&
        isChecked.includes(expense.category) && <ExpenseRow expense={expense} />
      );
    }
  };

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
            {expenses.map((expense) => renderExpense(expense))}
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
