import DashboardCategoriesSection from "./DashboardCategoriesSection";

const DashboardSidebar = () => {
  return (
    <div className="divide-x-2 border-slate-500 bg-offwhite">
      <DashboardCategoriesSection />
      {/* get categories from budget and map over them to transform them into UI
      cards */}
    </div>
  );
};

export default DashboardSidebar;
