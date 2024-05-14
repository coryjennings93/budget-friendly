import { useAuth } from "@/context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { transactionsPerBudget, categoriesInBudget } = useAuth();
  const [totalCategoryAmountArray, setTotalCategoryAmountArray] =
    useState(null);
  if (!categoriesInBudget || !transactionsPerBudget) {
    return <div className="h-[269.56px]"></div>;
  }
  const arrayOfCategoryAmounts = [];
  for (let i = 0; i < categoriesInBudget.length; i++) {
    const totalPerCategory = transactionsPerBudget.reduce(
      (acc, transaction) => {
        if (transaction.category_id === categoriesInBudget[i].category_id) {
          return acc + parseFloat(transaction.transaction_amount);
        }
        return acc;
      },
      0
    );
    arrayOfCategoryAmounts.push(totalPerCategory);
  }

  const labels = categoriesInBudget.map((category) => category.category_name);

  const transactionsForChart = {
    labels: labels,
    datasets: [
      {
        label: "Amount spent",
        data: arrayOfCategoryAmounts,
        // backgroundColor: [
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(54, 162, 235, 0.2)",
        //   "rgba(255, 206, 86, 0.2)",
        // ],
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
      colors: {
        forceOverride: true,
      },
    },
  };

  return (
    <div>
      <Pie
        data={transactionsForChart}
        options={options}
        style={{ width: "250px", height: "250px" }}
      />
    </div>
  );
};

export default PieChart;
