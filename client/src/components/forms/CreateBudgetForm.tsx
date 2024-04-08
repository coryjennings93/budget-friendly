import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddExpenseValidation } from "@/utils/validation";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useExpensesDemo } from "@/context";
import LogoIcon from "../icons/LogoIcon";
import AddCategory from "../shared/AddCategory";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";
import { formatCostBasedOnTransactionType } from "@/utils/utils";

const CreateBudgetForm = () => {
  const { categories, addExpense } = useExpensesDemo();
  const categoriesList = categories.map((category: string) => category.name);
  const { user } = useAuth();
  const axiosPrivate = useAxiosAuthInstance();
  const [serverErrors, setServerErrors] = useState(null);
  // check to see if the AddCategory Dialog form is open and prevent the onSubmit behavior of this form
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  // pass this function handler down through props to the AddCategory component to control above state based on if the AddCategory Dialog form is open or closed
  const handleIsOpen = () => setIsAddCategoryOpen(!isAddCategoryOpen);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AddExpenseValidation>>({
    resolver: zodResolver(AddExpenseValidation),
    defaultValues: {
      transactionType: undefined,
      date: undefined,
      cost: undefined,
      category: "",
      transactionDescription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddExpenseValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.transactionType);
    values.cost = formatCostBasedOnTransactionType(
      values.transactionType,
      values.cost
    );
    console.log(values.cost);
    return;
    try {
      if (!user) {
        addExpense(values);
        //   await new Promise((resolve) => setTimeout(resolve, 1000));
        //   throw new Error();
        form.reset();
      } else {
        try {
          // define transaction
          const transaction = {
            user: user.id,
            date: values.date,
            cost: values.cost,
            category: values.category,
            type: values.transactionType,
            transactionDescription: values.transactionDescription,
            bank_account: "main",
          };

          const response = await axiosPrivate
            .post("/api/v1/transactions", transaction)
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
      }
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
            onSubmit={!isAddCategoryOpen && form.handleSubmit(onSubmit)}
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
                        id="transactionDescription"
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
              name="amount"
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
            <div className="sm:flex sm:flex-row sm:gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
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
                            <SelectItem value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div onClick={() => console.log()}>
                        <AddCategory handleIsOpen={handleIsOpen} />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryAmount"
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
            </div>

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

export default CreateBudgetForm;
