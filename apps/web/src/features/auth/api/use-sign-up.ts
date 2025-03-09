'use client';

import { useMutation } from '@tanstack/react-query';
import { authKeys } from './keys';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  userId: string;
}

/**
 * Hook for signing up a new user
 *
 * @returns Mutation function for signing up
 */
export function useSignUp() {
  return useMutation({
    mutationKey: authKeys.user(),
    mutationFn: async (data: SignUpData): Promise<SignUpResponse> => {
      // In a real application, this would be an API call
      // const response = await clientApi.api.auth.signUp.post({ json: data });
      // if (response.data.error) {
      //   throw new Error(response.data.error || 'Failed to sign up');
      // }
      // return response.data.data;

      // Mock implementation
      console.log('Signing up user:', data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if email is already taken (would be an actual API call in production)
      if (data.email === 'demo@example.com') {
        throw new Error('Email is already registered');
      }

      // Return mock response
      return {
        success: true,
        message: 'Account created successfully',
        userId: `user-${Math.random().toString(36).substring(2, 10)}`,
      };
    },
  });
}
