import { useEffect, useState } from "react";
import PieChart from "../shared/charts/PieChart";
import DashboardCategoriesSection from "./DashboardCategoriesSection";

const DashboardSidebar = ({ height }: { height: number }) => {
  const heightToString = height.toString();
  const heightClassName = `h-[${heightToString}px]`;
  const heightMinusMargin = height - 12;

  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const calculateMaxHeight = () => {
      const pieChartHeight =
        document.getElementById("pieChartContianer").offsetHeight;
      const remainingHeight = heightMinusMargin - pieChartHeight - 30;
      setMaxHeight(remainingHeight);
    };

    calculateMaxHeight();
    window.addEventListener("resize", calculateMaxHeight);
    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, []);

  return (
    <div
      className={`flex-col gap-2 flex mt-1 ${heightClassName} `}
      style={{ maxHeight: heightMinusMargin }}
    >
      <div
        className="border-2 border-blue-200 rounded shadow-md p-2 grow max-h-full "
        style={{ height: maxHeight }}
      >
        <DashboardCategoriesSection height={maxHeight} />
      </div>
      <div className="border-2 border-blue-200 rounded py-2 shadow-md grow-0">
        <div id="pieChartContianer">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
