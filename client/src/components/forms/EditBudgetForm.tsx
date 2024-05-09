import { useAuth } from "@/context/AuthContext";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";
import { EditBudgetValidation } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import LogoIcon from "../icons/LogoIcon";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AddCategory from "../shared/AddCategory";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EditBudgetForm = () => {
  const { categoriesInBudget, selectedBudget, user, categories, setBudgets } =
    useAuth();

  const categoriesList = categories.map(
    (category: {
      category_id: number;
      category_name: string;
      user_account_id: number;
    }) => category.category_name
  );

  const axiosPrivate = useAxiosAuthInstance();
  const [serverErrors, setServerErrors] = useState(null);
  // check to see if the AddCategory Dialog form is open and prevent the onSubmit behavior of this form
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  // pass this function handler down through props to the AddCategory component to control above state based on if the AddCategory Dialog form is open or closed
  const handleIsOpen = () => setIsAddCategoryOpen(!isAddCategoryOpen);

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditBudgetValidation>>({
    resolver: zodResolver(EditBudgetValidation),
    defaultValues: {
      budgetName: selectedBudget.monthly_budget_name,
      month: selectedBudget.monthly_budget_month,
      year: selectedBudget.monthly_budget_year,
      budgetAmount: selectedBudget.monthly_budget_amount,
      //   categories: categoriesInBudget
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  // Function to calculate the total amount of categories
  const calculateTotalCategoriesAmount = (
    categories: { category: string; categoryAmount: string }[]
  ) => {
    return categories.reduce(
      (total: number, category: { category: string; categoryAmount: number }) =>
        total + parseFloat(category.categoryAmount),
      0
    );
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EditBudgetValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const validCategories = values.categories.filter(
      (category) => category.category && category.categoryAmount
    );
    console.log("validCategories: ", validCategories);
    if (
      calculateTotalCategoriesAmount(values.categories) !== values.budgetAmount
    ) {
      form.setError("categories", {
        type: "manual",
        message:
          "The total of all categories must be equal to the total budget.",
      });
      return;
    }
    console.log(values.categories);

    // Remove empty category objects
    // Construct valid categories array
    // const validCategories = fields
    //   .map((field) => ({
    //     category: field.category,
    //     categoryAmount: field.categoryAmount,
    //   }))
    //   .filter((category) => category.category && category.categoryAmount);
    // console.log("validCategories: ", validCategories);
    // console.log("fields: ", fields);
    try {
      try {
        // define transaction
        const budget = {
          budget_name: values.budgetName,
          budget_month: values.month,
          budget_year: values.year,
          budget_amount: values.budgetAmount,
          budget_categories: validCategories,
        };

        console.log("budget: ", budget);

        const response = await axiosPrivate
          .post("/api/v1/budgets", budget)
          .then((response) => {
            if (response.status === 201) {
              setBudgets(() => response.data);
            }
          })
          .catch((error) => {
            console.error(error);
            setServerErrors(error);
          });

        setServerErrors(null);
        form.reset();
        return;
      } catch (error) {
        console.error(error);
        setServerErrors([
          { message: "An unexpected error has occured." },
          { message: "Please try again." },
        ]);
      }
      form.reset();
    } catch (error) {
      form.setError("root", {
        message: "There was an error saving your expense. Please try again.",
      });
    }
  }

  return (
    <>
      {serverErrors && (
        <ul className="p-4 mb-6 font-bold bg-red-300 border-2 rounded-md border-slate-400">
          {serverErrors.map((error, key) => {
            console.log(error);
            return (
              <li className="list-disc list-inside" key={key}>
                {error.message}
              </li>
            );
          })}
        </ul>
      )}
      <Form {...form}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-3 text-4xl font-bold gradient-text">
            Create Budget
          </h2>

          <LogoIcon width="w-24" />

          <form
            onSubmit={
              !isAddCategoryOpen ? form.handleSubmit(onSubmit) : undefined
            }
            className="flex flex-col w-full gap-3 mt-4"
          >
            <div className="sm:flex sm:flex-row sm:gap-3">
              <FormField
                control={form.control}
                name="budgetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="budgetName"
                        placeholder="Nickname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <div className="flex gap-1 ">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="January">January</SelectItem>
                          <SelectItem value="February">February</SelectItem>
                          <SelectItem value="March">March</SelectItem>
                          <SelectItem value="April">April</SelectItem>
                          <SelectItem value="May">May</SelectItem>
                          <SelectItem value="June">June</SelectItem>
                          <SelectItem value="July">July</SelectItem>
                          <SelectItem value="August">August</SelectItem>
                          <SelectItem value="September">September</SelectItem>
                          <SelectItem value="October">October</SelectItem>
                          <SelectItem value="November">November</SelectItem>
                          <SelectItem value="December">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <div className="flex gap-1 ">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from(
                            { length: 10 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <SelectItem value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="budgetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Budget</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="&#36; 0.00" {...field} step={"any"} /> */}
                    <CurrencyInput
                      id="cost"
                      decimalsLimit={2}
                      placeholder="&#36; 0.00"
                      value={field.value}
                      prefix="$ "
                      onValueChange={field.onChange}
                      className="block h-10 px-3 py-2 text-sm font-normal border rounded-md border-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm font-medium sm:flex sm:gap-1">
              <p>Categories</p>
              <div className="sm:ml-auto" onClick={() => console.log()}>
                <AddCategory
                  handleIsOpen={handleIsOpen}
                  fromCreateBudget={true}
                />
              </div>
            </div>
            {fields.map((field, index) => (
              <div className="sm:flex sm:flex-row sm:gap-3" key={field.id}>
                <div className="grow">
                  <FormField
                    control={form.control}
                    name={`categories.${index}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-1 ">
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoriesList.map((category: string) => (
                                <SelectItem value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`categories.${index}.categoryAmount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CurrencyInput
                          id="cost"
                          decimalsLimit={2}
                          placeholder="&#36; 0.00"
                          value={field.value}
                          prefix="$ "
                          onValueChange={field.onChange}
                          className="block h-10 px-3 py-2 text-sm font-normal border rounded-md border-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="destructive" onClick={() => remove(index)}>
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </div>
            ))}
            <p
              className="text-blue-900 cursor-pointer hover:text-blue-500"
              onClick={() =>
                append({
                  category: "",
                  categoryAmount: undefined,
                })
              }
            >
              + Add another category
            </p>

            {form.formState.errors.categories && (
              <div className="text-red-500">
                {form.formState.errors.categories.message}
              </div>
            )}

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="mt-6 text-lg"
            >
              {form.formState.isSubmitting ? "Adding..." : "Add"}
            </Button>
            {form.formState.errors.root && (
              <div className="text-sm font-medium text-red-500">
                {form.formState.errors.root.message}
              </div>
            )}
          </form>
        </div>
      </Form>
    </>
  );
};

export default EditBudgetForm;
