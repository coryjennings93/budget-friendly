import { createContext, useState, ReactNode, useContext } from "react";
import { demoExpenses } from "@/utils/demoExpenses";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { set } from "react-hook-form";

interface ExpensesDemoContextProviderProps {
  children: ReactNode;
  // any props that come into the component
}

export const ExpensesDemoContext = createContext();

export const useExpensesDemo = () => {
  return useContext(ExpensesDemoContext);
};

export const ExpensesDemoContextProvider = ({
  children,
}: ExpensesDemoContextProviderProps) => {
  const [expenses, setExpenses] = useLocalStorage("expenses", demoExpenses);

  const [categories, setCategories] = useLocalStorage("categories", [
    { id: uuidv4(), name: "Transportation", isChecked: false },
    { id: uuidv4(), name: "Restaurant", isChecked: false },
    { id: uuidv4(), name: "Wardrobe", isChecked: false },
    { id: uuidv4(), name: "Groceries", isChecked: false },
    { id: uuidv4(), name: "Pet", isChecked: false },
    { id: uuidv4(), name: "Entertainment", isChecked: false },
    { id: uuidv4(), name: "Insurance", isChecked: false },
    { id: uuidv4(), name: "Housing", isChecked: false },
    { id: uuidv4(), name: "Utilities", isChecked: false },
    { id: uuidv4(), name: "Healthcare", isChecked: false },
    { id: uuidv4(), name: "Savings", isChecked: false },
    { id: uuidv4(), name: "Investment", isChecked: false },
    { id: uuidv4(), name: "Miscellaneous", isChecked: false },
  ]);

  const [isChecked, setIsChecked] = useState([]);

  const addExpense = ({ date, category, location, cost }) => {
    setExpenses((prevExpenses) => {
      [...prevExpenses, { id: uuidv4(), date, category, location, cost }];
    });
  };

  const addCategory = ({ name }) => {
    setCategories((prevCategories) => {
      if (prevCategories.find((category) => category.name === name)) {
        return prevCategories;
      }
      return [...prevCategories, { id: uuidv4(), name, isChecked: false }];
    });
  };

  const filterByCategory = (category) => {
    console.log(expenses.filter((expense) => expense.category === category));
    // return expenses.filter((expense) => expense.category === category);
  };

  const total = expenses.reduce((acc, expense) => acc + expense.cost, 0);

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  const deleteCategory = ({ id }) => {
    setCategory((prevCategory) => {
      return prevCategory.filter((cateory) => expense.id !== id);
    });
  };

  return (
    <ExpensesDemoContext.Provider
      value={{
        expenses,
        setCategories,
        categories,
        isChecked,
        setIsChecked,
        addExpense,
        addCategory,
        filterByCategory,
        total,
        deleteExpense,
      }}
    >
      {children}
    </ExpensesDemoContext.Provider>
  );
};
export default ExpensesDemoContextProvider;
