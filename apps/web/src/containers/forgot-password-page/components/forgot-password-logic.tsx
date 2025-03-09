"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgotPasswordApollo } from "./forgot-password-apollo";

// Define the form schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Define the form types
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/**
 * Logic layer for the forgot password form
 * Handles form state, validation, and connects to the Apollo layer
 */
export function useForgotPasswordLogic() {
  // Get Apollo layer functions and state
  const {
    handleSubmit: submitToApi,
    isLoading,
    isSubmitted,
    error,
    setError,
    submittedEmail,
  } = useForgotPasswordApollo();

  // Initialize form with react-hook-form
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    // Call the Apollo layer to submit the form data
    await submitToApi({
      email: values.email,
    });
  };

  return {
    form,
    onSubmit,
    isLoading,
    isSubmitted,
    error,
    setError,
    submittedEmail,
  };
}
