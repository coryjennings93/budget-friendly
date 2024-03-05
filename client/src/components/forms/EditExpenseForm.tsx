import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditExpenseValidation } from "@/utils/validation";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormDescription,
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
import { useState } from "react";

const EditExpenseForm = ({ expense, onSubmit, form }) => {
  const { categories, expenses, editExpense } = useExpensesDemo();
  const categoriesList = categories.map((category: string) => category.name);
  // value for currency input
  const [value, setValue] = useState(expense.cost.toString());

  /* Defining form and submit handler are taken care of in parent componet: EditExpenseButton
        I am not sure if this is the best way for reuse purposes but i wanted to be able to close the 
        parent dialog alert when the form was submitted   
    */

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-3 text-4xl font-bold gradient-text">Edit Expense</h2>

        <LogoIcon width="w-24" />

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-3 mt-4"
        >
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
                      name="cost"
                      decimalsLimit={2}
                      placeholder="$ 0.00"
                      prefix="$ "
                      value={value}
                      onValueChange={(value, name, values) => {
                        value ? setValue(value) : setValue("");
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionOrLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    id="descriptionOrLocation"
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
  );
};

export default EditExpenseForm;
