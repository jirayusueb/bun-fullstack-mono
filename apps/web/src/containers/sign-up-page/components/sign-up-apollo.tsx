"use client";

import { useState } from "react";

// This would typically import your API client
// import { clientApi } from '@/lib/api/client';

/**
 * Apollo layer for the sign-up form
 * Handles API interactions for sign-up functionality
 */
export function useSignUpApollo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle form submission to the API
  const handleSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      // Here you would typically call your API to register the user
      // const response = await clientApi.auth.signUp.post({
      //   json: {
      //     name: data.name,
      //     email: data.email,
      //     password: data.password,
      //   }
      // });

      // For now, we'll just simulate a successful registration
      console.log("Sign up attempt with:", {
        name: data.name,
        email: data.email,
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setError("Failed to create account. Please try again.");
      setIsLoading(false);
      return {
        success: false,
        error: "Failed to create account. Please try again.",
      };
    }
  };

  return {
    handleSubmit,
    isLoading,
    error,
    setError,
  };
}
