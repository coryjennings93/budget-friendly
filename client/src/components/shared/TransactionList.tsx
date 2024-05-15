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
import { useEffect, useState } from "react";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";
import { useAuth } from "@/context/AuthContext";
import TransactionRow from "./TransactionRow";

interface ITransaction {
  bank_account_id?: number;
  category_id: number;
  monthly_budget_id: number;
  transaction_amount: number;
  transaction_date: Date | string;
  transaction_description: string;
  transaction_id: number;
  transaction_type: string;
  user_account_id: number;
}

const TransactionList = () => {
  const {
    transactionsPerBudget,
    categoriesInBudget,
    categories,
    filteredTransactionsPerBudget,
  } = useAuth();

  const calculatedTotal = () => {
    if (filteredTransactionsPerBudget.length > 0) {
      return filteredTransactionsPerBudget.reduce((acc, curr) => {
        if (typeof curr.transaction_amount === "string") {
          const currentAmountStringToNumber = parseFloat(
            curr.transaction_amount
          );
          return acc + currentAmountStringToNumber;
        }
        return acc + curr.transaction_amount;
      }, 0);
    } else {
      return transactionsPerBudget.reduce((acc, curr) => {
        if (typeof curr.transaction_amount === "string") {
          const currentAmountStringToNumber = parseFloat(
            curr.transaction_amount
          );
          return acc + currentAmountStringToNumber;
        }
        return acc + curr.transaction_amount;
      }, 0);
    }
  };

  const [total, setTotal] = useState<number>(() => {
    return calculatedTotal();
  });

  useEffect(() => {
    const calculatedTotalReturnValue = calculatedTotal();
    console.log("calculatedtotalreturnvalue: ", calculatedTotalReturnValue);
    setTotal(calculatedTotalReturnValue);
  }, [transactionsPerBudget, filteredTransactionsPerBudget]);

  const { width } = useViewport();
  //   transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  //   if (filteredByDate.length > 0) {
  //   }

  const renderExpense = (expense) => {
    return <TransactionRow key={expense.transaction_id} expense={expense} />;

    // console.log(filteredByDate);
    // console.log(expense.id);
    // if (filteredByDate.length === 0 && isChecked.length === 0) {
    //   if (!dateFilter) {
    //     return <ExpenseRow expense={expense} />;
    //   }
    //   return;
    // } else if (
    //   filteredByDate.length === 0 &&
    //   isChecked.includes(expense.category)
    // ) {
    //   return <ExpenseRow expense={expense} />;
    // } else if (isChecked.length === 0 && filteredByDate.includes(expense)) {
    //   return <ExpenseRow expense={expense} />;
    // } else {
    //   return (
    //     filteredByDate.includes(expense) &&
    //     isChecked.includes(expense.category) && <ExpenseRow expense={expense} />
    //   );
    // }
  };

  if (width >= MEDIUM_SCREEN_SIZE) {
    return (
      <div className="flex items-center justify-center ">
        <Table className="max-w-screen-md   bg-white">
          <TableHeader className="bg-cyan-700  ">
            <TableRow>
              <TableHead className="w-[100px] text-offwhite font-bold">
                Date
              </TableHead>
              <TableHead className="text-offwhite font-bold">
                Category
              </TableHead>
              <TableHead className="text-offwhite font-bold">
                Location
              </TableHead>
              <TableHead className="text-right text-offwhite font-bold">
                Cost
              </TableHead>
              <TableHead className="w-[100px] "></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactionsPerBudget.length > 0
              ? filteredTransactionsPerBudget.map((expense: ITransaction) => {
                  return renderExpense(expense);
                })
              : transactionsPerBudget.map((expense: ITransaction) => {
                  return renderExpense(expense);
                })}
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
    );
  } else {
    return <div>transactionlist</div>;
    //   <div className="mx-1 border-2 divide-y rounded-md divide-slate-900 border-slate-900">
    //     {transactions.map((expense) =>
    //       isChecked.length === 0 ? (
    //         <ExpenseCard expense={expense} />
    //       ) : (
    //         isChecked.includes(expense.category) && (
    //           <ExpenseCard expense={expense} />
    //         )
    //       )
    //     )}
    //     <div className="flex items-center justify-center p-2">
    //       <p>
    //         <b>Total:</b> {currencyFormatter.format(total)}
    //       </p>
    //     </div>
    //   </div>
  }
};

export default TransactionList;
