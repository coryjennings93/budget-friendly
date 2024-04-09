import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCategoryForm from "../../forms/AddCategoryForm";
import { Button } from "../../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateBudgetForm from "@/components/forms/CreateBudgetForm";

const CreateBudgetButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="create budget">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className={"overflow-y-auto max-h-screen"}>
        <DialogHeader></DialogHeader>
        <CreateBudgetForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateBudgetButton;
