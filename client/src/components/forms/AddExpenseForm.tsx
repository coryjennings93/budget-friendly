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

const AddExpenseForm = () => {
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
    try {
      console.log(typeof values.date);
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
            type: "expense", // "income" or "expense
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
          {serverErrors.map((error, key) => (
            <li className="list-disc list-inside" key={key}>
              {error.message}
            </li>
          ))}
        </ul>
      )}
      <Form {...form}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-3 text-4xl font-bold gradient-text">Add Expense</h2>

          <LogoIcon width="w-24" />

          <form
            onSubmit={!isAddCategoryOpen && form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-3 mt-4"
          >
            <div className="flex flex-col mt-2 sm:flex-wrap sm:flex-row">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "sm:w-[240px] pl-3 text-left font-normal w-full sm:mr-3",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy")
                            ) : (
                              <span>Date of expense</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          fromYear={1985}
                          toYear={new Date().getFullYear()}
                          selected={field.value}
                          onSelect={field.onChange}
                          defaultMonth={field.value}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-4 grow sm:mt-0">
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="&#36; 0.00" {...field} step={"any"} /> */}
                      <CurrencyInput
                        id="cost"
                        decimalsLimit={2}
                        placeholder="&#36; 0.00"
                        value={field.value}
                        prefix="$ "
                        onValueChange={field.onChange}
                        className="h-10 px-3 py-2 text-sm font-normal border rounded-md border-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="flex gap-1 ">
                    <Select onValueChange={field.onChange} value={field.value}>
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
              name="transactionDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      id="transactionDescription"
                      placeholder="Location or description of the purchase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default AddExpenseForm;
