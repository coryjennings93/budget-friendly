import CurrencyInput from "react-currency-input-field";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditExpenseForm from "../forms/EditExpenseForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditExpenseValidation } from "@/utils/validation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";

const EditExpenseButton = ({ expense }) => {
  const [open, setOpen] = useState(false);
  const { categoriesDemo, expenses, editExpense } = useExpensesDemo();
  const {
    user,
    selectedBudget,
    categories,
    setTransactionsPerBudget,
    categoriesInBudget,
  } = useAuth();

  const axiosPrivate = useAxiosAuthInstance();

  // category list depending on if user is authenticated or not
  const categoriesList = user
    ? categoriesInBudget.map((category) => {
        return {
          category_name: category.category_name,
          category_id: category.category_id,
        };
      })
    : categoriesDemo.map((category) => category.name);

  // need to set state to clear the field values back to original values when closed without saving

  const [costValue, setCostValue] = useState(
    user ? expense.transaction_amount.toString() : expense.cost.toString()
  );

  const [categoryValue, setCategoryValue] = useState(
    user
      ? categoriesList.find((cat) => cat.category_id === expense.category_id)
          .category_name
      : expense.category
  );
  useEffect(() => {
    console.log("categoryValue: ", categoryValue);
  }, []);
  const [dateValue, setDateValue] = useState(
    user
      ? new Date(expense.transaction_date.toDateString())
      : new Date(expense.date)
  );
  const [transactionDescriptionValue, setTransactionDescriptionValue] =
    useState(
      user ? expense.transaction_description : expense.transactionDescription
    );
  const [transactionTypeValue, setTransactionTypeValue] = useState(
    user ? "expense" : expense.transactionType
  );

  let defaultValues;
  if (!user) {
    defaultValues = {
      id: expense.id,
      date: undefined,
      cost: expense.cost.toString(),
      category: expense.category,
      transactionDescription: expense.transactionDescription,
    };
  } else {
    defaultValues = {
      id: expense.transaction_id,
      date: expense.transaction_date,
      cost: expense.transaction_amount.toString(),
      category: categoryValue,
      transactionDescription: expense.transaction_description,
    };
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditExpenseValidation>>({
    resolver: zodResolver(EditExpenseValidation),
    defaultValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EditExpenseValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!user) {
      try {
        editExpense(values);

        console.log(values);
        setOpen(false);
        return;
      } catch (error) {
        form.setError("root", {
          message: "There was an error saving your expense. Please try again.",
        });
        return;
      }
    }

    if (user) {
      try {
        console.log("category name from edit button: ", values.category);
        // get category ID
        const category_id = categories.find(
          (category) => category.category_name === categoryValue
        ).category_id;
        // define transaction
        const transaction = {
          transaction_id: values.id,
          transaction_date: dateValue,
          transaction_amount: costValue,
          transaction_description: transactionDescriptionValue,
          category_id: category_id,
          monthly_budget_id: selectedBudget.monthly_budget_id,
        };

        console.log("transaction after post: ", transaction);

        const response = await axiosPrivate
          .put("/api/v1/transactions", transaction)
          .then((response) => {
            console.log("Response: ", response);
            if (response.statusText === "OK") {
              console.log("Transaction Added: ", response.data);
              setTransactionsPerBudget(response.data);
            }
            console.log("Response.data: ", response.data);
          })
          .catch((error) => {
            console.error(error);
            form.setError("root", {
              message:
                "There was an error saving your expense. Please try again.",
            });
          });

        form.reset();
        return;

        // fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/budgets/${selectedBudget.budget_id}/transactions/${values.id}`,
        //   {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${user.token}`,
        //     },
        //     body: JSON.stringify(transaction),
        //   }
        // )
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw new Error("There was an error saving your expense.");
        //     }
        //     return response.json();
        //   })
        //   .then((data) => {
        //     setTransactionsPerBudget(data.transactions);
        //     setOpen(false);
        //   })
        //   .catch((error) => {
        //     form.setError("root", {
        //       message: "There was an error saving your expense. Please try again.",
        //     });
        //   });
      } catch (error) {
        form.setError("root", {
          message: "There was an error saving your expense. Please try again.",
        });
        return;
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-0 m-0 h-[20px]" title="edit" variant="ghost">
          <FontAwesomeIcon className="p-3" icon={faPenToSquare} />
        </Button>
      </DialogTrigger>
      <DialogContent className={"overflow-y-auto max-h-screen"}>
        <Form {...form}>
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-3 text-4xl font-bold gradient-text">
              Edit Transaction
            </h2>

            <LogoIcon width="w-24" />

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-3 mt-4"
            >
              {/* <div className="max-w-48">
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <div className="flex gap-1 ">
                    <Select
                      onValueChange={(value) => {
                        value
                          ? setTransactionTypeValue(value)
                          : setTransactionTypeValue("");
                        field.onChange(value);
                      }}
                      value={transactionTypeValue}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Expense or Income" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Expense">Expense</SelectItem>
                          <SelectItem value="Income">Income</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="hidden"
                        id="id"
                        placeholder="Location or description of the purchase"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col mt-2 sm:flex-wrap sm:flex-row">
                <FormField
                  control={form.control}
                  name="date"
                  defaultValue={new Date(expense.date)}
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
                                format(dateValue, "MM/dd/yyyy")
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
                            selected={new Date(dateValue)}
                            onSelect={(e) => {
                              field.onChange(e);
                              setDateValue(e);
                            }}
                            defaultMonth={new Date(dateValue)}
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
                          name="cost"
                          decimalsLimit={2}
                          placeholder="$ 0.00"
                          prefix="$ "
                          value={costValue}
                          onValueChange={(value, name, values) => {
                            value
                              ? setCostValue(value.toString())
                              : setCostValue("");
                            field.onChange(value);
                          }}
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
                    <Select
                      onValueChange={(value) => {
                        console.log("value from select: ", value);
                        value ? setCategoryValue(value) : setCategoryValue("");
                        field.onChange(value);
                      }}
                      value={categoryValue}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesList.map(
                          (category: {
                            category_name: string;
                            category_id: number;
                          }) => (
                            <SelectItem
                              value={category.category_name}
                              key={category.category_id}
                            >
                              {category.category_name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
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
                        value={transactionDescriptionValue}
                        onChange={(e) => {
                          e.target.value
                            ? setTransactionDescriptionValue(e.target.value)
                            : setTransactionDescriptionValue("");
                          field.onChange(e.target.value);
                        }}
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
                {form.formState.isSubmitting ? "Editing..." : "Edit"}
              </Button>
              {form.formState.errors.root && (
                <div className="text-red-500">
                  {form.formState.errors.root.message}
                </div>
              )}
            </form>
          </div>
        </Form>
      </DialogContent>{" "}
    </Dialog>
  );
};

export default EditExpenseButton;
