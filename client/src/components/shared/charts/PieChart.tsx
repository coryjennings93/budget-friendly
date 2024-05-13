import { useAuth } from "@/context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data2 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  const { transactionsPerBudget, categoriesInBudget } = useAuth();
  const [totalCategoryAmountArray, setTotalCategoryAmountArray] =
    useState(null);
  console.log("categories in budget from Pie chart: ", categoriesInBudget);
  if (!categoriesInBudget || !transactionsPerBudget) {
    return <div className="h-[269.56px]"></div>;
  }
  let arrayOfCategoryAmounts = [];
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
  console.log("Array of Category Amounts: ", arrayOfCategoryAmounts);
  //   setTotalCategoryAmountArray(arrayOfCategoryAmounts);

  const labels = categoriesInBudget.map((category) => category.category_name);
  //   const data = totalCategoryAmountArray;
  //   console.log("Data: ", data);

  const transactionsForChart = {
    labels: labels,
    datasets: [
      {
        label: "Amount spent",
        data: arrayOfCategoryAmounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie
        data={transactionsForChart}
        options={{ maintainAspectRatio: false }}
        style={{ width: "250px", height: "250px" }}
      />
    </div>
  );
};

export default PieChart;
