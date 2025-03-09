'use client';

import { useMutation } from '@tanstack/react-query';
import { authKeys } from './keys';

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Hook for requesting a password reset
 *
 * @returns Mutation function for forgot password
 */
export function useForgotPassword() {
  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async (email: string): Promise<ForgotPasswordResponse> => {
      // In a real application, this would be an API call
      // const response = await clientApi.api.auth.forgotPassword.post({ json: { email } });
      // if (response.data.error) {
      //   throw new Error(response.data.error || 'Failed to send reset link');
      // }
      // return response.data.data;

      // Mock implementation
      console.log('Requesting password reset for:', email);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Return mock response
      return {
        success: true,
        message: 'Password reset link has been sent to your email',
      };
    },
  });
}
