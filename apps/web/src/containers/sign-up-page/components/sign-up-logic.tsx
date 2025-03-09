"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignUpApollo } from "./sign-up-apollo";

// Define the form schema
const signUpSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// Define the form types
export type SignUpFormValues = z.infer<typeof signUpSchema>;

/**
 * Logic layer for the sign-up form
 * Handles form state, validation, and connects to the Apollo layer
 */
export function useSignUpLogic(onSuccess: () => void) {
  // Get Apollo layer functions and state
  const {
    handleSubmit: submitToApi,
    isLoading,
    error,
    setError,
  } = useSignUpApollo();

  // Initialize form with react-hook-form
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: SignUpFormValues) => {
    // Call the Apollo layer to submit the form data
    const result = await submitToApi({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    // If successful, call the onSuccess callback
    if (result?.success) {
      onSuccess();
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    error,
    setError,
  };
}
