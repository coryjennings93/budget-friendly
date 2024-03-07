import Header from "../components/shared/Header";
import ExpensesCompleteTable from "../components/shared/ExpensesCompleteTable";

const Demo = () => {
  return (
    <div className="solid-bg">
      <div className="pb-4 radial-bg">
        <Header />
      </div>
      <ExpensesCompleteTable />
    </div>
  );
};

export default Demo;
