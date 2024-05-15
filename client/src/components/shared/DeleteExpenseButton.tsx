import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddExpenseForm from "../forms/AddExpenseForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { useExpensesDemo } from "@/context";
import { useAuth } from "@/context/AuthContext";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";
import { useState } from "react";

const DeleteExpenseButton = ({ expense }) => {
  const { deleteExpense } = useExpensesDemo();
  const { user, selectedBudget, setTransactionsPerBudget } = useAuth();
  const axiosPrivate = useAxiosAuthInstance();
  const [serverErrors, setServerErrors] = useState(null);
  console.log("Expense from delete: ", expense);

  const deleteExpenseAuth = async () => {
    try {
      // define transaction
      const transaction = {
        transaction_id: expense.transaction_id,
        user_id: expense.user_account_id,
        transaction_date: expense.transaction_date,
        transaction_description: expense.transaction_description,
        category_id: expense.category_id,
        transaction_amount: expense.transaction_amount.cost,
        monthly_budget_id: selectedBudget.monthly_budget_id,
      };

      const response = await axiosPrivate
        .delete("/api/v1/transactions", { data: transaction })
        .then((response) => {
          console.log("Response from delete: ", response);
          if (response.statusText === "OK") {
            setTransactionsPerBudget(response.data);
          }
          console.log("Response.data: ", response.data);
        })
        .catch((error) => {
          console.error(error);
          setServerErrors(error);
        });

      setServerErrors(null);
      return;
    } catch (error) {
      console.error(error);
      setServerErrors([
        {
          message: "There was an error saving your expense. Please try again.",
        },
      ]);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="p-0 m-0 h-[20px]" title="delete" variant="ghost">
          <FontAwesomeIcon className="text-primary " icon={faTrash} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        {serverErrors && (
          <ul className="p-4 mb-4 mt-4 font-bold bg-red-300 border-2 rounded-md border-slate-400">
            {serverErrors.map((error, key) => {
              console.log(error);
              return (
                <li className="list-disc list-inside" key={key}>
                  {error.message}
                </li>
              );
            })}
          </ul>
        )}
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this expense?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            This will permanently delete this expense. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              user ? deleteExpenseAuth() : deleteExpense(expense)
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteExpenseButton;
