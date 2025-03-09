'use client';

import { useState, useCallback } from 'react';
import { ApiErrorResponse } from './types';

interface ApiErrorState {
  message: string;
  code?: string;
  details?: any;
}

/**
 * Hook for handling API errors in a consistent way
 *
 * @returns Functions and state for managing API errors
 */
export function useApiError() {
  const [error, setError] = useState<ApiErrorState | null>(null);

  /**
   * Handle an API error response
   */
  const handleApiError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      setError({ message: err.message });
      return;
    }

    if (typeof err === 'object' && err !== null && 'error' in err) {
      const apiError = err as ApiErrorResponse;
      setError({
        message: apiError.error,
        code: apiError.code,
        details: apiError.details,
      });
      return;
    }

    setError({ message: 'An unknown error occurred' });
  }, []);

  /**
   * Clear the current error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleApiError,
    clearError,
    hasError: error !== null,
  };
}
