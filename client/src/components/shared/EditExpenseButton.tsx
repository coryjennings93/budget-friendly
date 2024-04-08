import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";

const EditExpenseButton = ({ expense }) => {
  const [open, setOpen] = useState(false);
  const { editExpense } = useExpensesDemo();

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditExpenseValidation>>({
    resolver: zodResolver(EditExpenseValidation),
    defaultValues: {
      id: expense.id,
      type: expense.transactionType,
      date: undefined,
      cost: expense.cost.toString(),
      category: expense.category,
      transactionDescription: expense.transactionDescription,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EditExpenseValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      editExpense(values);

      console.log(values);
      setOpen(false);
    } catch (error) {
      form.setError("root", {
        message: "There was an error saving your expense. Please try again.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-0" title="edit">
          <FontAwesomeIcon className="p-4 " icon={faPenToSquare} />
        </Button>
      </DialogTrigger>
      <DialogContent className={"overflow-y-auto max-h-screen"}>
        <EditExpenseForm expense={expense} onSubmit={onSubmit} form={form} />
      </DialogContent>{" "}
    </Dialog>
  );
};

export default EditExpenseButton;
