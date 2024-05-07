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
import { useAuth } from "@/context/AuthContext";
import useAxiosAuthInstance from "@/hooks/useAxiosAuthInstance";

const AddCategoryForm = () => {
  const { addCategory } = useExpensesDemo();
  const { user, setCategories } = useAuth();
  const axiosPrivate = useAxiosAuthInstance();

  const form = useForm<z.infer<typeof AddCategoryValidation>>({
    resolver: zodResolver(AddCategoryValidation),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AddCategoryValidation>) {
    try {
      if (!user) {
        addCategory(values);
        //   await new Promise((resolve) => setTimeout(resolve, 1000));
        //   throw new Error();
        form.reset();
      } else {
        try {
          const category = { name: values.name, user_id: user.id };
          const response = await axiosPrivate
            .post("/api/v1/categories", category)
            .then((response) => {
              console.log("outside201: ", response.data);
              if (response.status === 201) {
                setCategories(() => response.data);
              }
            })
            .catch((error) => {
              console.error(error);
              setServerErrors(error);
            });
        } catch (error) {
          form.setError("root", {
            message:
              "There was an error saving your expense. Please try again.",
          });
        }
      }
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
