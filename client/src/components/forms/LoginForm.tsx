import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginValidation } from "@/utils/validation";
import { JwtPayload, jwtDecode } from "jwt-decode";

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
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const [serverErrors, setServerErrors] = useState<
    { message: string }[] | null
  >(null);
  const navigate = useNavigate();
  const { setUser, fetchUserData, setAccessToken } = useAuth();
  useEffect(() => {
    console.log("serverErrors: ", serverErrors);
  }, [serverErrors]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (
      values.email === "email@example.com" &&
      values.password === "password"
    ) {
      form.reset();
      navigate("/demo");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("login was successful", response);
        const json = await response.json();
        console.log(json);
        try {
          const accessToken = json.accessToken;
          setAccessToken(accessToken);

          await fetchUserData();

          setServerErrors(null);
          form.reset();
          navigate("/dashboard");
        } catch (error) {
          console.error(error);
          setServerErrors([
            { message: "An unexpected error has occured." },
            { message: "Please try again." },
          ]);
        }

        if (json.errors) {
          console.error(json.errors);
          setServerErrors(json.errors);
        } else {
          setServerErrors([
            { message: "An unexpected error has occured." },
            { message: "Please try again." },
          ]);
        }
        return;
      } else {
        const json = await response.json();
        console.error(json);
        setServerErrors(json.errors);
      }
      return;
    } catch (error) {
      console.error(error);
      setServerErrors([
        { message: "An unexpected error has occured." },
        { message: "Please try again." },
      ]);
    }
  }

  return (
    <>
      {serverErrors && (
        <ul className="p-4 mb-6 font-bold bg-red-300 border-2 rounded-md border-slate-400">
          {serverErrors.map((error, key) => (
            <li className="list-disc list-inside" key={key}>
              {error.message}
            </li>
          ))}
        </ul>
      )}
      <Form {...form}>
        <div className="flex flex-col items-center justify-center p-10 border-2 border-gray-900 rounded-xl radial-bg">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="mb-1 text-sm">
            Log in to track your spending behavior.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-3 mt-4"
          >
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

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Logging in..." : "Log In"}
            </Button>
            <p className="">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up.
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

export default LoginForm;
