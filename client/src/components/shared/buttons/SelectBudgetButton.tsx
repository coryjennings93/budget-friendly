import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";

const SelectBudgetButton = () => {
  const {
    budgets,
    setCategoriesInBudget,
    setSelectedBudget,
    setTransactionsPerBudget,
  } = useAuth();

  const axiosPrivate = useAxiosAuthInstance();

  const handleSelectChange = async (budgetName) => {
    const budget = budgets.find(
      (element) => element.monthly_budget_name === budgetName
    );
    setSelectedBudget(budget);
    const budgetID = parseInt(budget.monthly_budget_id);
    const categoriesPerBudget = await axiosPrivate.get(
      `/api/v1/budgets/${budgetID}/categories`
    );
    const categoriesArray = categoriesPerBudget.data;
    // need to parse the budget_by_category_amount to a float because it is stred as a numeric data type in postgres
    // and is returned as a string
    for (let i = 0; i < categoriesArray.length; i++) {
      categoriesArray[i].budget_by_category_amount = parseFloat(
        categoriesArray[i].budget_by_category_amount
      );
    }
    setCategoriesInBudget(categoriesArray);

    // get transactions for the selected budget
    const transactionsPerBudget = await axiosPrivate.get(
      `/api/v1/budgets/${budgetID}/transactions`
    );
    console.log("transactionsPerBudget: ", transactionsPerBudget.data);
    // convert transaction_amount to a float because it is stored as a decimal type in postgres and is returned as a string
    for (let i = 0; i < transactionsPerBudget.data.length; i++) {
      transactionsPerBudget.data[i].transaction_amount = parseFloat(
        transactionsPerBudget.data[i].transaction_amount
      );
    }
    setTransactionsPerBudget(transactionsPerBudget.data);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Budget" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {budgets.map((budget) => (
            <SelectItem
              key={budget.monthly_budget_id}
              value={budget.monthly_budget_name}
            >
              {budget.monthly_budget_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectBudgetButton;
