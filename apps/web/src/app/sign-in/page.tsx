import { SignInContainer } from '@/containers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return <SignInContainer />;
}
