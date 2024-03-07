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
    addCategory(values);
    form.reset();
    
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default AddCategoryForm;
