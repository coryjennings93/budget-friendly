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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";
import { useToast } from "@/components/ui/use-toast";

const DeleteBudgetButton = () => {
  const {
    user,
    selectedBudget,
    setTransactionsPerBudget,
    setSelectedBudget,
    setBudgets,
  } = useAuth();
  const axiosPrivate = useAxiosAuthInstance();
  const { toast } = useToast();

  const deleteExpenseAuth = async () => {
    try {
      const response = await axiosPrivate
        .delete("/api/v1/budgets", { data: selectedBudget })
        .then((response) => {
          console.log("Response from delete: ", response);
          if (response?.statusText === "OK") {
            setBudgets(response.data);
            setSelectedBudget(null);
          } else if (response.status === 500) {
            toast({
              title: "Error: ",
              description:
                "There was a server error deleting your budget. Please try again.",
            });
          } else {
            toast({
              title: "Error: ",
              description:
                "There was an error deleting your budget. Please try again.",
            });
          }
          console.log("Response.data: ", response.data);
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Error: ",
            description:
              "There was an error deleting your budget. Please try again.",
          });
        });
      return;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error:",
        description:
          "There was an error saving your expense. Please try again.",
      });
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
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this budget:{" "}
            {selectedBudget.monthly_budget_name}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            This will permanently delete this expense. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteExpenseAuth()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBudgetButton;
