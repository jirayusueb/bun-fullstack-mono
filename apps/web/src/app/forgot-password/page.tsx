import { ForgotPasswordContainer } from '@/containers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordContainer />;
}
