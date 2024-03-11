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
import { format, set } from "date-fns";

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
    { id: uuidv4(), name: "Uncategorized", isChecked: false },
  ]);

  const [isChecked, setIsChecked] = useLocalStorage("checked-categories", []);

  const [total, setTotal] = useLocalStorage("total", () =>
    expenses.reduce((acc, expense) => acc + expense.cost, 0)
  );

  const [filteredByDate, setFilteredByDate] = useState([]);
  // use this to show that the date filter has been used but nneded to show that there are no
  // expenses for that range and need to show nothing. used to differentiate from the state where no
  // range has been selected
  const [dateFilter, setDateFilter] = useState(false);

  // set total based on checked categories and filtered by date
  useEffect(() => {
    if (isChecked.length === 0 && filteredByDate.length === 0) {
      if (dateFilter) {
        setTotal(0);
      } else {
        setTotal(expenses.reduce((acc, expense) => acc + expense.cost, 0));
      }
    } else if (filteredByDate.length === 0 && isChecked.length > 0) {
      setTotal(
        expenses
          .filter((expense) => isChecked.includes(expense.category))
          .reduce((acc, expense) => acc + expense.cost, 0)
      );
    } else if (filteredByDate.length > 0 && isChecked.length === 0) {
      setTotal(
        expenses
          .filter((expense) => filteredByDate.includes(expense))
          .reduce((acc, expense) => acc + expense.cost, 0)
      );
    } else {
      setTotal(
        expenses
          .filter(
            (expense) =>
              isChecked.includes(expense.category) &&
              filteredByDate.includes(expense)
          )
          .reduce((acc, expense) => acc + expense.cost, 0)
      );
    }
  }, [isChecked, expenses, filteredByDate]);

  // useEffect(() =>{
  //   setTotal(expenses.filter((expense) => isChecked.includes(expense.category)

  //   )}).reduce((acc, expense) => acc + expense.cost, 0))
  // }, [])

  const addExpense = ({ date, category, transactionDescription, cost }) => {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidv4(), date, category, transactionDescription, cost },
      ];
    });
  };

  const editExpense = ({
    id,
    date,
    category,
    transactionDescription,
    cost,
  }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        return expense.id === id
          ? { ...expense, date, category, transactionDescription, cost }
          : expense;
      });
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

  // const filterByCategory = (category) => {
  //   // expenses.filter((expense) => expense.category === category);
  // };

  useEffect(() => {
    console.log(dateFilter);
  }, [dateFilter]);

  const filterByDate = (date) => {
    if (date === undefined) {
      setFilteredByDate([]);
      setDateFilter(false);
      return;
    }
    if (date.from === undefined || date.to === undefined) {
      setFilteredByDate([]);
      setDateFilter(false);
      return expenses;
    }

    setDateFilter(true);
    setFilteredByDate(
      expenses.filter((expense) => {
        const expenseDate = new Date(expense.date).getTime();
        // console.log(
        //   expenseDate >= date.from.getTime() && expenseDate <= date.to.getTime()
        // );
        // console.log(expenseDate);
        // console.log(date.from);
        // console.log(date.to);
        return (
          expenseDate >= date.from.getTime() && expenseDate <= date.to.getTime()
        );
      })
    );
  };

  const deleteExpense = (expense) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((item) => item.id !== expense.id);
    });
  };

  const deleteCategory = (id, category) => {
    setCategories((prevCategory) => {
      return prevCategory.filter((cateory) => cateory.id !== id);
    });

    // move all expenses that was in deleted category to uncategorized
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        return expense.category === category
          ? { ...expense, category: "Uncategorized" }
          : expense;
      });
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
        // filterByCategory,
        total,
        setTotal,
        deleteExpense,
        deleteCategory,
        filterByDate,
        filteredByDate,
        setFilteredByDate,
        dateFilter,
      }}
    >
      {children}
    </ExpensesDemoContext.Provider>
  );
};
export default ExpensesDemoContextProvider;
