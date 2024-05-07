import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardCategoryCard from "./DashboardCategoryCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

const DashboardCategoriesSection = () => {
  const { categoriesInBudget } = useAuth();
  console.log("categoriesInBudget: ", categoriesInBudget);
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ];
  return (
    <section className="p-2 m-2 border-2 rounded border-slate-500">
      <div className="flex flex-row">
        <h3>Categories</h3>
        <Button title="add category" className="ml-auto">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <div className="max-h-[300px] overflow-y-scroll scroller">
        {categoriesInBudget && categoriesInBudget.length > 0
          ? categoriesInBudget.map((category: string, i) => (
              <DashboardCategoryCard key={i} category={category} />
            ))
          : categories.map((category, i) => (
              <DashboardCategoryCard key={i} category={category} />
            ))}
      </div>
    </section>
  );
};

export default DashboardCategoriesSection;
