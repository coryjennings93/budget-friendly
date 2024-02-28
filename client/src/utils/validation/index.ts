import { z } from "zod"
 
export const SignupValidation = z.object({
  email: z.string().email({message: "Invalid email."}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters.'}).max(15, {message: 'Password cannot be over 15 characters.'}),
  confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters.'}).max(15, {message: 'Password cannot be over 15 characters.'})
}).refine((data) => data.password === data.confirmPassword, {message: 'Passwords do not match.', path: ['confirmPassword']})