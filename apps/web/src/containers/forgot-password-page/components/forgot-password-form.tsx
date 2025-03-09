"use client";

import Link from "next/link";
import { useForgotPasswordLogic } from "./forgot-password-logic";

// UI Components
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

/**
 * View layer for the forgot password form
 * Handles UI rendering and user interactions
 */
export function ForgotPasswordForm() {
  // Get form logic
  const { form, onSubmit, isLoading, isSubmitted, error, submittedEmail } =
    useForgotPasswordLogic();

  if (isSubmitted) {
    return (
      <Card className="mt-8 border-green-100 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Reset link sent</CardTitle>
          <CardDescription className="text-green-700">
            We've sent a password reset link to {submittedEmail}. Please check
            your inbox.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href="/sign-in"
            className="text-sm font-medium text-primary hover:underline"
          >
            Return to sign in
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="mt-8">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>

          <div className="text-center text-sm">
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
