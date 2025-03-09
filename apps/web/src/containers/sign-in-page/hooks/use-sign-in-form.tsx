"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignIn } from "@/features/auth/api";

// Define the form schema
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// Define the form types
export type SignInFormValues = z.infer<typeof signInSchema>;

/**
 * Hook for managing the sign-in form
 * Combines form state management with API integration
 */
export function useSignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  // Get the sign-in mutation from the API
  const signInMutation = useSignIn();

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
    try {
      // Clear any previous errors
      setError("");

      // Call the sign-in mutation
      const response = await signInMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      // Handle successful sign-in
      console.log("Sign in successful:", response);

      // Store the token in localStorage or a secure cookie
      // localStorage.setItem('auth_token', response.token);

      // Redirect to dashboard or home page
      // router.push('/dashboard');
    } catch (err) {
      // Handle sign-in error
      setError(err instanceof Error ? err.message : "Failed to sign in");
    }
  };

  return {
    form,
    onSubmit,
    isLoading: signInMutation.isPending,
    error,
    setError,
  };
}
