import { z } from "zod";

/**
 * Schema for sign-in form
 */
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

/**
 * Schema for sign-up form
 */
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

/**
 * Schema for forgot password form
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email address" }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
