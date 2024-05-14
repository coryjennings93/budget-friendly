import * as React from "react";
import { useExpensesDemo } from "@/context/ExpensesDemoContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

const CategoriesDropdownAuth = ({}) => {
  const { categoriesInBudget, filterTransactionsByCategory } = useAuth();
  console.log("categoriesInBudget", categoriesInBudget);

  const [isChecked, setIsChecked] = React.useState<number[]>([]);

  const [isAllChecked, setIsAllChecked] = React.useState(() => {
    return isChecked.length === 0 ? true : false;
  });

  React.useEffect(() => {
    if (isChecked.length === 0) {
      setIsAllChecked(true);
      filterTransactionsByCategory([]);
    }
    if (isChecked.length > 0) {
      //   setIsAllChecked(false);
      filterTransactionsByCategory(isChecked);
    }
  }, [isChecked]);

  React.useEffect(() => {
    if (isAllChecked) {
      setIsChecked([]);
    }
  }, [isAllChecked]);

  const all = "All";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <FontAwesomeIcon icon={faFilter} className="mr-1" />
          Filter by Category
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 h-56 overflow-y-scroll scroller"
        side="bottom"
        align="start"
      >
        <DropdownMenuCheckboxItem
          checked={isAllChecked}
          onCheckedChange={(newCheckedState) => {
            if (isAllChecked === true) {
              setIsAllChecked(true);
            } else {
              setIsAllChecked(newCheckedState);

              // reset the isChecked array
            }
          }}
        >
          {all}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {categoriesInBudget.map(
          (category: {
            budget_by_category_amount: number;
            category_id: number;
            category_name: string;
            monthly_budget_id: number;
          }) => (
            <DropdownMenuCheckboxItem
              key={category.category_id}
              checked={isChecked.includes(category.category_id)}
              onCheckedChange={(newCheckedState) => {
                setIsAllChecked(false);

                setIsChecked((prev) => {
                  if (newCheckedState) {
                    return [...prev, category.category_id];
                  } else {
                    return prev.filter((item) => item !== category.category_id);
                  }
                });

                if (isChecked.includes(category.category_id)) {
                  setIsAllChecked(false);
                }
              }}
            >
              {category.category_name}
            </DropdownMenuCheckboxItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropdownAuth;
