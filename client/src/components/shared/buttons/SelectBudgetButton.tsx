import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectBudgetButton = () => {
  const budgets = [
    "May 2024",
    "April 2024",
    "March 2024",
    "February 2024",
    "January 2024",
  ];
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Budget" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {budgets.map((budget) => (
            <SelectItem key={budget} value={budget}>
              {budget}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectBudgetButton;
