'use client';

import { useMutation } from '@tanstack/react-query';
import { authKeys } from './keys';
import { ApiResponse } from '@/features/shared/api/types';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

/**
 * Hook for signing in a user
 *
 * @returns Mutation function for signing in
 */
export function useSignIn() {
  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async (credentials: SignInCredentials): Promise<SignInResponse> => {
      // In a real application, this would be an API call
      // const response = await clientApi.api.auth.signIn.post({ json: credentials });
      // if (response.data.error) {
      //   throw new Error(response.data.error || 'Failed to sign in');
      // }
      // return response.data.data;

      // Mock implementation
      console.log('Signing in with:', credentials);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check mock credentials (would be an actual API call in production)
      if (credentials.email !== 'demo@example.com' || credentials.password !== 'password123') {
        throw new Error('Invalid email or password');
      }

      // Return mock user data
      return {
        user: {
          id: 'user1',
          name: 'Demo User',
          email: credentials.email,
        },
        token: 'mock-jwt-token',
      };
    },
  });
}
