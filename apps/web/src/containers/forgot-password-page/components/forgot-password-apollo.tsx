"use client";

import { useState } from "react";

// This would typically import your API client
// import { clientApi } from '@/lib/api/client';

/**
 * Apollo layer for the forgot password form
 * Handles API interactions for forgot password functionality
 */
export function useForgotPasswordApollo() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Function to handle form submission to the API
  const handleSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    setError("");

    try {
      // Here you would typically call your API to send a password reset email
      // const response = await clientApi.auth.forgotPassword.post({
      //   json: {
      //     email: data.email,
      //   }
      // });

      // For now, we'll just simulate a successful submission
      console.log("Password reset requested for:", data.email);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store the submitted email for display in the success message
      setSubmittedEmail(data.email);

      // Show success message
      setIsSubmitted(true);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      setIsLoading(false);
      return {
        success: false,
        error: "Failed to send reset link. Please try again.",
      };
    }
  };

  return {
    handleSubmit,
    isLoading,
    isSubmitted,
    error,
    setError,
    submittedEmail,
  };
}
