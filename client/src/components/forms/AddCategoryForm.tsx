import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddCategoryValidation } from "@/utils/validation";
import { useExpensesDemo } from "@/context";

const AddCategoryForm = () => {
  const { addCategory } = useExpensesDemo();

  const form = useForm<z.infer<typeof AddCategoryValidation>>({
    resolver: zodResolver(AddCategoryValidation),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof AddCategoryValidation>) {
    try {
      addCategory(values);
      form.reset();
    } catch (error) {
      form.setError("root", {
        message: "There was an error saving your expense. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please enter a new category</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This category will be added to your list of categories.
              </FormDescription>
              {form.formState.errors.root && (
                <div className="text-sm font-medium text-red-500">
                  {form.formState.errors.root.message}
                </div>
              )}
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
      </form>
    </Form>
  );
};
export default AddCategoryForm;
