import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCategoryForm from "../forms/AddCategoryForm";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddCategory = ({ handleIsOpen, fromCreateBudget }) => {
  return (
    <Dialog onOpenChange={handleIsOpen}>
      <DialogTrigger asChild>
        {fromCreateBudget ? (
          <button
            title="add category"
            className="text-blue-900 hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-1">Create new category</span>
          </button>
        ) : (
          <Button title="add category">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={"overflow-y-auto max-h-screen"}>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <AddCategoryForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
