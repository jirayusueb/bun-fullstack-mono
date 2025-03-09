"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignUp } from "@/features/auth/api";

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
 * Hook for managing the sign-up form
 * Combines form state management with API integration
 */
export function useSignUpForm(onSuccess: () => void) {
  const [error, setError] = useState("");

  // Get the sign-up mutation from the API
  const signUpMutation = useSignUp();

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
    try {
      // Clear any previous errors
      setError("");

      // Call the sign-up mutation
      const response = await signUpMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      // Handle successful sign-up
      console.log("Sign up successful:", response);

      // Call the success callback
      onSuccess();
    } catch (err) {
      // Handle sign-up error
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create account. Please try again."
      );
    }
  };

  return {
    form,
    onSubmit,
    isLoading: signUpMutation.isPending,
    error,
    setError,
  };
}
