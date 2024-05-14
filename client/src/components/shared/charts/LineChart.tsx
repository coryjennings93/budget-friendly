import {
  Colors,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAuth } from "@/context/AuthContext";

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { selectedBudget, transactionsPerBudget, categoriesInBudget } =
    useAuth();

  if (!selectedBudget || !transactionsPerBudget || !categoriesInBudget) {
    return <h1>Loading Data...</h1>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${selectedBudget.monthly_budget_month} ${selectedBudget.monthly_budget_year}`,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  const getNumericValueForMonth = (month: string) => {
    switch (month) {
      case "January":
        return 1;
      case "February":
        return 2;
      case "March":
        return 3;
      case "April":
        return 4;
      case "May":
        return 5;
      case "June":
        return 6;
      case "July":
        return 7;
      case "August":
        return 8;
      case "September":
        return 9;
      case "October":
        return 10;
      case "November":
        return 11;
      case "December":
        return 12;
      default:
        return 1;
    }
  };

  const getArrayOfDaysInMonth = (month: number, year: number) => {
    // get the amount of days that have passed in the month if we are in the current month
    // check to see if the selected budget is the current monthly budget
    const currentDate = new Date();
    if (
      currentDate.getFullYear() === year &&
      currentDate.getMonth() + 1 === month
    ) {
      const currentDay = currentDate.getDate();
      console.log("Current Day: ", currentDay);
      const arrayOfDays = [];
      for (let i = 1; i <= currentDay; i++) {
        arrayOfDays.push(i);
      }
      console.log("array of days: ", arrayOfDays);
      return arrayOfDays;
    } else {
      const daysInMonth = new Date(year, month, 0).getDate();
      console.log("Days in month: ", daysInMonth);
      const arrayOfDays = [];
      for (let i = 1; i <= daysInMonth; i++) {
        arrayOfDays.push(i);
      }
      console.log("array of days: ", arrayOfDays);
      return arrayOfDays;
    }
  };

  // make an array of totals per day in the month for transactions
  const arrayOfTotalsPerDay = getArrayOfDaysInMonth(
    getNumericValueForMonth(selectedBudget.monthly_budget_month),
    parseInt(selectedBudget.monthly_budget_year)
  ).map((day) => {
    const totalPerDay = transactionsPerBudget.reduce((acc, transaction) => {
      if (
        transaction.transaction_date.getDate() === day &&
        transaction.transaction_date.getMonth() ===
          getNumericValueForMonth(selectedBudget.monthly_budget_month) - 1 &&
        transaction.transaction_date.getFullYear() ===
          parseFloat(selectedBudget.monthly_budget_year)
      ) {
        console.log("Transaction Amount: ", transaction.transaction_amount);
        return acc + parseFloat(transaction.transaction_amount);
      }
      return acc;
    }, 0);
    return totalPerDay;
  });

  const labels = getArrayOfDaysInMonth(
    getNumericValueForMonth(selectedBudget.monthly_budget_month),
    selectedBudget.monthly_budget_year
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Spending Per Day",
        data: arrayOfTotalsPerDay,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
