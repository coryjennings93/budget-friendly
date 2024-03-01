import Header from "../components/shared/Header";
import ExpensesCompleteTable from "../components/shared/ExpensesCompleteTable";
import ExpensesDemoContextProvider from "../context/ExpensesDemoContext";

const Demo = () => {
  return (
    <ExpensesDemoContextProvider>
      <div className="solid-bg">
        <div className="pb-4 header-bg">
          <Header />
        </div>
        <ExpensesCompleteTable />
      </div>
    </ExpensesDemoContextProvider>
  );
};

export default Demo;
