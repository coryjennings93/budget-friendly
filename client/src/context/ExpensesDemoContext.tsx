import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { demoExpenses } from "@/utils/demoExpenses";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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

  const [isChecked, setIsChecked] = useLocalStorage("checked-categories", []);

  // const totalFunct = () => {
  //   return expenses.reduce((acc, expense) => acc + expense.cost, 0);
  // };
  // console.log(totalFunct());

  const [total, setTotal] = useLocalStorage("total", () =>
    expenses.reduce((acc, expense) => acc + expense.cost, 0)
  );

  useEffect(() => {
    if (isChecked.length === 0) {
      setTotal(expenses.reduce((acc, expense) => acc + expense.cost, 0));
    } else {
      setTotal(
        expenses
          .filter((expense) => isChecked.includes(expense.category))
          .reduce((acc, expense) => acc + expense.cost, 0)
      );
    }
  }, [isChecked, expenses]);

  // useEffect(() =>{
  //   setTotal(expenses.filter((expense) => isChecked.includes(expense.category)

  //   )}).reduce((acc, expense) => acc + expense.cost, 0))
  // }, [])

  const addExpense = ({ date, category, descriptionOrLocation, cost }) => {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidv4(), date, category, descriptionOrLocation, cost },
      ];
    });
  };

  const editExpense = ({ id, date, category, descriptionOrLocation, cost }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        return expense.id === id
          ? { ...expense, date, category, descriptionOrLocation, cost }
          : expense;
      });
    });
  };

  // useEffect(() => {
  //   console.log(expenses);
  // }, [expenses]);

  const addCategory = ({ name }) => {
    setCategories((prevCategories) => {
      if (prevCategories.find((category) => category.name === name)) {
        return prevCategories;
      }
      return [...prevCategories, { id: uuidv4(), name, isChecked: false }];
    });
  };

  const filterByCategory = (category) => {
    expenses.filter((expense) => expense.category === category);
    // return expenses.filter((expense) => expense.category === category);
  };

  // const total = () => expenses.reduce((acc, expense) => acc + expense.cost, 0);

  const deleteExpense = (expense) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((item) => item.id !== expense.id);
    });
  };

  // ({ id }) => {
  //   setExpenses((prevExpenses) => {
  //     return prevExpenses.filter((expense) => expense.id !== id);
  //   });
  // };

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
        editExpense,
        addCategory,
        filterByCategory,
        total,
        setTotal,
        deleteExpense,
      }}
    >
      {children}
    </ExpensesDemoContext.Provider>
  );
};
export default ExpensesDemoContextProvider;
