import { z } from "zod"

const getCategories = () => {
  let categories = localStorage.getItem("categories")
  categories = categories ? JSON.parse(categories) : [];
  if (categories.length > 0) {
    categories = categories.map((category) => category.name);
    return categories;
  }
  return categories;
}
getCategories();

//-----------------Custom Types-------------------
// const px = z.custom<categories>((val) => {
//   return i
//   typeof val === "string" ? /^\d+px$/.test(val) : false;
// });
 
// ------------Validation Schemas----------------
export const SignupValidation = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}).max(45, {message: 'Name cannot be over 45 characters.'}),
  email: z.string().email({message: "Invalid email."}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters.'}).max(15, {message: 'Password cannot be over 15 characters.'}),
  confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters.'}).max(15, {message: 'Password cannot be over 15 characters.'})
}).refine((data) => data.password === data.confirmPassword, {message: 'Passwords do not match.', path: ['confirmPassword']})

export const LoginValidation = z.object({
  email: z.string().email({message: "Invalid email."}),
  password: z.string().min(1, {message: 'Please enter your password.'}).max(15, {message: 'Password cannot be over 15 characters.'})});


export const AddExpenseValidation = z.object({
  transactionType: z.string().min(1, {message: 'Please select a transaction type.'}),
  date: z.date({
    required_error: "A date of transaction is needed.",
  }),
  cost: z.string().min(1, {message: 'Cost must be at least 0.01.'}).transform((val) => +val),
  category: z.string().min(1, {message: "Must select a category."}).max(200, {message: 'Input cannot be over 200 characters.'}),
  transactionDescription: z.string()
})

export const EditExpenseValidation = z.object({
  id: z.string(),
  transactionType: z.string().min(1, {message: 'Please select a transaction type.'}),
  date: z.date({
    required_error: "A date of transaction is needed.",
  }),
  cost: z.string().min(1, {message: 'Cost must be at least 0.01.'}).transform((val) => +val),
  category: z.string().min(1, {message: "Must select a category."}).max(200, {message: 'Input cannot be over 200 characters.'}),
  transactionDescription: z.string()
})

export const AddCategoryValidation = z.object({
  name: z
    .string()
    .min(2, {
      message: "Category must be at least 2 characters.",
    })
    .max(200, { message: "Input cannot be over 200 characters." }),
});

export const DeleteCategoryValidation = z.object({
  name: z.string({
    required_error: "Please select a language.",
  }),
})



