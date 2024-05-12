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

  return (
    <div className="bg-[rgb(255,246,210)] my-2 rounded p-2">
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
