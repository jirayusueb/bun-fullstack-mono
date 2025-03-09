# Shared API Utilities

This directory contains shared utilities for working with API responses in a consistent way across the application.

## Response Templates

The `types.ts` file defines standardized response templates that all API hooks should use:

```typescript
// Standard API response
interface ApiResponse<T> {
  data: T;
  error?: string | null;
  meta?: {
    timestamp: string;
    [key: string]: any;
  };
}

// Paginated response
interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
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

// Error response
interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: any;
  meta?: {
    timestamp: string;
    [key: string]: any;
  };
}

// Success response with no data
interface ApiSuccessResponse {
  success: true;
  message?: string;
  meta?: {
    timestamp: string;
    [key: string]: any;
  };
}
```

## Utility Hooks and Functions

### useApiError

A hook for handling API errors in a consistent way:

```typescript
const { error, handleApiError, clearError, hasError } = useApiError();

try {
  // Some API call
} catch (err) {
  handleApiError(err);
}

if (hasError) {
  return <ErrorDisplay message={error.message} />;
}
```

### Transform Response Utilities

The `transform-response.ts` file provides utilities for working with API responses:

- `wrapResponse<T>(data: T)`: Wraps data in the standard API response format
- `createErrorResponse(error, code?, details?)`: Creates a standardized error response
- `extractData<T>(response: ApiResponse<T>)`: Safely extracts data from an API response
- `withApiResponse<T>(fn)`: HOF that transforms a function to return API responses

Example:

```typescript
// Original function
async function fetchUser(id: string): Promise<User> {
  // Implementation...
}

// With API response wrapper
const fetchUserWithResponse = withApiResponse(fetchUser);
const response = await fetchUserWithResponse('123');

// response: {
//   data: { id: '123', name: 'John' },
//   meta: { timestamp: '2023...' }
// }
```

## Best Practices

1. All API hooks should return data in the standard response format
2. Error handling should be consistent across all hooks
3. Meta information (timestamps, etc.) should be included in all responses
4. Use the utility functions to create and transform responses
5. For one-off customizations, extend the base types rather than creating new ones
