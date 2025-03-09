import { HttpStatus } from "@/shared/domain/errors";

/**
 * Standard success response format
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, any>;
}

/**
 * Wraps data in a standard success response format
 */
export function createSuccessResponse<T>(
  data: T,
  meta?: Record<string, any>
): SuccessResponse<T> {
  return {
    success: true,
    data,
    meta,
  };
}

/**
 * Creates a paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number
): SuccessResponse<T[]> {
  return {
    success: true,
    data,
    meta: {
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        hasMore: page * pageSize < total,
      },
    },
  };
}
