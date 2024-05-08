const DashboardCategoryCard = ({
  category,
  budgetAmount,
}: {
  category: string;
  budgetAmount: number;
}) => {
  return (
    <div className="bg-[rgb(255,246,210)] my-2 rounded p-2">
      <div>{category}</div>
      <div>
        <div>100/{budgetAmount}</div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardCategoryCard;
