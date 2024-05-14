import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CreateBudgetForm from "@/components/forms/CreateBudgetForm";
import EditBudgetForm from "@/components/forms/EditBudgetForm";

interface EditBudgetButtonProps {
  handleIsOpen: () => void | null;
  fromAddTransaction: boolean;
}

const EditBudgetButton = ({
  handleIsOpen,
  fromAddTransaction,
}: EditBudgetButtonProps) => {
  return (
    <Dialog onOpenChange={fromAddTransaction ? handleIsOpen : undefined}>
      <DialogTrigger asChild>
        <Button title="edit budget">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </DialogTrigger>
      <DialogContent className={"overflow-y-auto max-h-screen"}>
        <DialogHeader></DialogHeader>
        <EditBudgetForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditBudgetButton;
