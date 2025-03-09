"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgotPassword } from "@/features/auth/api";

// Define the form schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Define the form types
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/**
 * Hook for managing the forgot password form
 * Combines form state management with API integration
 */
export function useForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");

  // Get the forgot-password mutation from the API
  const forgotPasswordMutation = useForgotPassword();

  // Initialize form with react-hook-form
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      // Clear any previous errors
      setError("");

      // Call the forgot-password mutation
      const response = await forgotPasswordMutation.mutateAsync(values.email);

      // Handle successful submission
      console.log("Password reset requested:", response);

      // Store the submitted email for display in the success message
      setSubmittedEmail(values.email);

      // Show success message
      setIsSubmitted(true);
    } catch (err) {
      // Handle error
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send reset link. Please try again."
      );
    }
  };

  return {
    form,
    onSubmit,
    isLoading: forgotPasswordMutation.isPending,
    isSubmitted,
    error,
    submittedEmail,
  };
}
