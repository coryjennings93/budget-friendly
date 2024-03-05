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
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

const AddExpense = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Add Expense</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {/* Add Expense */}
            <span className="float-right">
              <AlertDialogCancel>
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </AlertDialogCancel>
            </span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AddExpenseForm />
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddExpense;
