import { useAuth } from "@/context/AuthContext";

const DashboardCategoryCard = ({
  category,
  budgetAmount,
}: {
  category: {
    budget_by_category_amount: number;
    category_id: number;
    category_name: string;
    user_account_id: number;
  };
  budgetAmount: number;
}) => {
  const { transactionsPerBudget } = useAuth();

  if (!transactionsPerBudget) {
    return <h1>Loading Data...</h1>;
  }

  const totalPerCategory = transactionsPerBudget.reduce((acc, transaction) => {
    if (transaction.category_id === category.category_id) {
      return acc + parseFloat(transaction.transaction_amount);
    }
    return acc;
  }, 0);

  // switch case to determine if a getting close to being over budget
  const getCloseToOverBudget = (
    totalPerCategory: number,
    budgetAmount: number
  ) => {
    const percent = (totalPerCategory / budgetAmount) * 100;
    if (percent >= 95) {
      return "bg-red-200";
    } else if (percent >= 70) {
      return "bg-yellow-200";
    } else {
      return "bg-green-200";
    }
  };

  // ${bg-[rgb(183,245,181)]}
  return (
    <div
      className={`my-2 rounded p-2  ${getCloseToOverBudget(
        totalPerCategory,
        budgetAmount
      )}`}
    >
      <div>{category.category_name}</div>
      <div>
        <div>
          {totalPerCategory}/{budgetAmount}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardCategoryCard;
