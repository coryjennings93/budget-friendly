import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { SignupValidation } from "@/utils/validation";
import { createNewUser } from "@/api/users";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SignupForm = () => {
  const [serverErrors, setServerErrors] = useState(null);
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (response.ok) {
        setServerErrors(null);
        form.reset();
        navigate("/dashboard");

        return;
      }
      if (json.errors) {
        console.error(json.errors);
        setServerErrors(json.errors);
      } else {
        console.error(json);
        setServerErrors([
          { msg: "An unexpected error has occured." },
          { msg: "Please try again." },
        ]);
      }
      return;
    } catch (error) {
      console.error(error);
      setServerErrors([
        { msg: "An unexpected error has occured." },
        { msg: "Please try again." },
      ]);
    }
  }

  return (
    <>
      {serverErrors && (
        <ul className="p-4 mb-6 font-bold bg-red-300 border-2 rounded-md border-slate-400">
          {serverErrors.map((error, key) => (
            <li className="list-disc list-inside" key={key}>
              {error.msg}
            </li>
          ))}
        </ul>
      )}
      <Form {...form}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center px-5 py-3 rounded-full bg-color">
            <h2 className="text-2xl font-bold">Create a new account</h2>
            <p className="mb-1 text-sm">
              Sign up to start tracking your spending.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-3 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="First Last" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="joe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password:</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
            <p className="">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in.
              </Link>
            </p>
            <p className="">
              Click{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                here
              </Link>{" "}
              to go back to home page.
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignupForm;
