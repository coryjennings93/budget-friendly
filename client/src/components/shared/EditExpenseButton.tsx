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
import EditExpenseForm from "../forms/EditExpenseForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { useExpensesDemo } from "@/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditExpenseValidation } from "@/utils/validation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditExpenseButton = ({ expense }) => {
  const [open, setOpen] = useState(false);
  const { editExpense } = useExpensesDemo();

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditExpenseValidation>>({
    resolver: zodResolver(EditExpenseValidation),
    defaultValues: {
      id: expense.id,
      date: new Date(expense.date),
      cost: expense.cost.toString(),
      category: expense.category,
      descriptionOrLocation: expense.descriptionOrLocation,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EditExpenseValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      editExpense(values);
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      //   throw new Error();
      setOpen(false);
    } catch (error) {
      form.setError("root", {
        message: "There was an error saving your expense. Please try again.",
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="p-0" title="edit">
          <FontAwesomeIcon className="p-4 " icon={faPenToSquare} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            <span className="float-right">
              <AlertDialogCancel onClick={() => form.reset()}>
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </AlertDialogCancel>
            </span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <EditExpenseForm expense={expense} onSubmit={onSubmit} form={form} />
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditExpenseButton;
