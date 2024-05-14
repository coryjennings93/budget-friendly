import PieChart from "../shared/charts/PieChart";
import DashboardCategoriesSection from "./DashboardCategoriesSection";

const DashboardSidebar = ({ height }: { height: number }) => {
  const heightToString = height.toString();
  const heightClassName = `h-[${heightToString}px]`;
  return (
    <div
      className={`flex-col gap-2 flex mt-1 ${heightClassName}`}
      style={{ height: height - 12 }}
    >
      <div className="border-2 border-blue-200 rounded shadow-md p-2 grow">
        <DashboardCategoriesSection />
      </div>
      <div className="border-2 border-blue-200 rounded py-2 shadow-md grow-0">
        <PieChart />
      </div>
    </div>
  );
};

export default DashboardSidebar;
