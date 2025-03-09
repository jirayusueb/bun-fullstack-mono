'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { SignUpForm } from './components/sign-up-form';

/**
 * Container component for the sign-up page
 * Handles page-level concerns like redirects
 */
export function SignUpPage() {
  const router = useRouter();

  // Handle successful sign-up
  const handleSignUpSuccess = () => {
    router.push('/sign-in?registered=true');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <SignUpForm onSuccess={handleSignUpSuccess} />

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
