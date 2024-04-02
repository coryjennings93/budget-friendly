const DashboardCategoryCard = ({ category }: { category: string }) => {
  return (
    <div className="bg-[rgb(255,246,210)] my-2 rounded p-2">
      <div>{category}</div>
      <div>
        <div>100/1000</div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardCategoryCard;
