"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignInApollo } from "./sign-in-apollo";

// Define the form schema
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// Define the form types
export type SignInFormValues = z.infer<typeof signInSchema>;

/**
 * Logic layer for the sign-in form
 * Handles form state, validation, and connects to the Apollo layer
 */
export function useSignInLogic() {
  // Get Apollo layer functions and state
  const {
    handleSubmit: submitToApi,
    isLoading,
    error,
    setError,
  } = useSignInApollo();

  // Initialize form with react-hook-form
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: SignInFormValues) => {
    // Call the Apollo layer to submit the form data
    await submitToApi({
      email: values.email,
      password: values.password,
    });
  };

  return {
    form,
    onSubmit,
    isLoading,
    error,
    setError,
  };
}
