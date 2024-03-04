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
  email: z.string().email({message: "Invalid email."}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters.'}).max(15, {message: 'Password cannot be over 15 characters.'}),
  confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters.'}).max(15, {message: 'Password cannot be over 15 characters.'})
}).refine((data) => data.password === data.confirmPassword, {message: 'Passwords do not match.', path: ['confirmPassword']})

export const AddExpenseValidation = z.object({
  date: z.date({
    required_error: "A date of transaction is needed.",
  }).transform((val) => val.toLocaleDateString("en-US")),
  cost: z.string().min(1, {message: 'Cost must be at least 0.01.'}).transform((val) => +val),
  category: z.string().min(1, {message: "Must select a category."}).max(200, {message: 'Input cannot be over 200 characters.'}),
  descriptionOrLocation: z.string()
})

export const AddCategoryValidation = z.object({
  category: z.string().min(1, {message: "Must provide a name for the category."}).max(200, {message: 'Input cannot be over 200 characters.'})
})



