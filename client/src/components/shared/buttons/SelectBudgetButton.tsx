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
import { useBudgets } from "@/hooks/useBudgets";
import { useState } from "react";

const SelectBudgetButton = () => {
  const { budgets, setCategoriesInBudget } = useAuth();
  console.log("budgets: ", budgets);
  const axiosPrivate = useAxiosAuthInstance();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectChange = async (budgetName) => {
    setSelectedItem(budgetName);
    console.log("budgetName: ", budgetName);
    const budget = budgets.find(
      (element) => element.monthly_budget_name === budgetName
    );
    const budgetID = parseInt(budget.monthly_budget_id);
    const categoriesPerBudget = await axiosPrivate.get(
      `/api/v1/budgets/${budgetID}/categories`
    );
    console.log("categoriesPerBudget: ", categoriesPerBudget.data);
    setCategoriesInBudget(categoriesPerBudget.data);
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
