/**
 * Utilities for transforming API responses
 */
import { ApiResponse, ApiErrorResponse } from './types';

/**
 * Wraps data in the standard API response format
 *
 * @param data The data to wrap
 * @returns A standardized API response object
 */
export function wrapResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Creates a standardized error response
 *
 * @param error The error message
 * @param code Optional error code
 * @param details Optional error details
 * @returns A standardized API error response
 */
export function createErrorResponse(
  error: string,
  code?: string,
  details?: any
): ApiErrorResponse {
  return {
    error,
    code,
    details,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Safely extracts data from an API response, throwing an error if one exists
 *
 * @param response The API response object
 * @returns The data from the response
 * @throws Error if the response contains an error
 */
export function extractData<T>(response: ApiResponse<T>): T {
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
}

/**
 * Higher-order function that transforms a function returning a regular value
 * into one that returns a standardized API response
 *
 * @param fn The function to transform
 * @returns A function that returns standardized API responses
 */
export function withApiResponse<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>
): (...args: Args) => Promise<ApiResponse<T>> {
  return async (...args: Args) => {
    try {
      const result = await fn(...args);
      return wrapResponse(result);
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: null as any,
          error: error.message,
          meta: {
            timestamp: new Date().toISOString(),
          },
        };
      }
      return {
        data: null as any,
        error: 'Unknown error occurred',
        meta: {
          timestamp: new Date().toISOString(),
        },
      };
    }
  };
}
