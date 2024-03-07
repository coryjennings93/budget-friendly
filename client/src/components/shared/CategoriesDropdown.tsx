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

const CategoriesDropdown = ({}) => {
  const {
    categories,
    setCategories,
    filterByCategory,
    isChecked,
    setIsChecked,
  } = useExpensesDemo();

  const [isAllChecked, setIsAllChecked] = React.useState(() => {
    return isChecked.length === 0 ? true : false;
  });

  const all = "All";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
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
              // set all other categories to unchecked
              const updatedCategories = categories.map((category) => {
                return { ...category, isChecked: false };
              });
              setCategories(updatedCategories);
              // reset the isChecked array
              setIsChecked([]);
            }
          }}
        >
          {all}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {categories.map(
          (category: { id: number; name: string; isChecked: boolean }) => (
            <DropdownMenuCheckboxItem
              key={category.id}
              checked={category.isChecked}
              onCheckedChange={(newCheckedState) => {
                setIsAllChecked(false);
                const updatedCategories = categories.map(
                  (obj: { id: number; name: string; isChecked: boolean }) =>
                    obj.id === category.id
                      ? { ...obj, isChecked: newCheckedState }
                      : obj
                );
                setCategories(updatedCategories);
                // check to see if any categories are still checked; if not, check the "All" category
                const anyChecked = updatedCategories.some(
                  (category) => category.isChecked === true
                );
                if (!anyChecked) {
                  setIsAllChecked(true);
                }
                // add or remove item from isChecked array
                setIsChecked((prev) => {
                  if (newCheckedState) {
                    return [...prev, category.name];
                  } else {
                    return prev.filter((item) => item !== category.name);
                  }
                });

                // filterByCategory(category.name);
              }}
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropdown;
