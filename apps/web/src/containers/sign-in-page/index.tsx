'use client';

import { SignInForm } from './components/sign-in-form.js';

/**
 * Container component for the sign-in page
 */
export function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <SignInForm />

        <div className="text-center text-sm">
          <p>
            Don't have an account?{' '}
            <a href="/sign-up" className="font-medium text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
