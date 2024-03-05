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

const DeleteExpenseButton = ({ expense }) => {
  const { deleteExpense } = useExpensesDemo();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="p-0" title="delete">
          <FontAwesomeIcon className="p-4 " icon={faTrash} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
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
          <AlertDialogAction onClick={() => deleteExpense(expense)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteExpenseButton;
