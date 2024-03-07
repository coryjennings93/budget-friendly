import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddExpenseForm from "../forms/AddExpenseForm";
import { Button } from "../ui/button";

const AddExpense = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Expense</Button>
      </DialogTrigger>
      <DialogContent className={"overflow-y-auto max-h-screen"}>
        <AddExpenseForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddExpense;
