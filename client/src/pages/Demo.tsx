import ExpensesCompleteTable from "../components/shared/ExpensesCompleteTable";
import DemoHeader from "@/components/demo/DemoHeader";

const Demo = () => {
  return (
    <div className="pb-2 solid-bg">
      <div className="pb-4 radial-bg">
        <DemoHeader />
      </div>
      <ExpensesCompleteTable />
    </div>
  );
};

export default Demo;
