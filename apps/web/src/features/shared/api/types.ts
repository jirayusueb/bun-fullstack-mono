/**
 * Shared API response types
 * Provides consistent response templates for all API endpoints
 */

/**
 * Standard API response wrapper
 * All API responses should follow this format for consistency
 */
export interface ApiResponse<T> {
  data: T;
  error?: string | null;
  meta?: {
    timestamp: string;
    [key: string]: any;
  };
}

/**
 * Paginated response format
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  meta: {
    timestamp: string;
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

/**
 * Error response format
 */
export interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: any;
  meta?: {
    timestamp: string;
    [key: string]: any;
  };
}

/**
 * Success response with no data
 */
export interface ApiSuccessResponse {
  success: true;
  message?: string;
  meta?: {
    timestamp: string;
    [key: string]: any;
  };
}
