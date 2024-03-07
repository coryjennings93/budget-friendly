import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { useExpensesDemo } from "@/context";
import { DeleteCategoryValidation } from "@/utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScrollArea } from "../ui/scroll-area";

const DeleteCategoryButton = () => {
  const { deleteCategory, categories } = useExpensesDemo();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");

  const form = useForm<z.infer<typeof DeleteCategoryValidation>>({
    resolver: zodResolver(DeleteCategoryValidation),
  });

  function onSubmit(data: z.infer<typeof DeleteCategoryValidation>) {
    deleteCategory(categoryId, data.name);
    form.reset();
    setOpenDialog(false);
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button title="delete category">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            This will permanently delete this category and move all expenses in
            this category to uncategorized. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              data.someValue = "someValue property";
              onSubmit(data);
            })}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) => category.name === field.value
                              ).name
                            : "Select Category..."}
                          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandEmpty>
                          This category was not found.
                        </CommandEmpty>
                        <ScrollArea>
                          <CommandGroup>
                            {categories
                              .filter(
                                (category) => category.name !== "Uncategorized"
                              )
                              .map((category) => (
                                <CommandItem
                                  key={category.id}
                                  value={category.name}
                                  onSelect={(e) => {
                                    form.setValue("name", category.name);
                                    setOpen(false);
                                    setCategoryId(category.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === category.name
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {category.name}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
        {/* <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? categories.find(
                    (category) => category.name.toLowerCase() === value
                  ).name
                : "Select category..."}
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
        </Popover> */}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryButton;
