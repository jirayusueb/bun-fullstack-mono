# API Error Handling

This directory contains the error handling system for the API. It provides a standardized way to handle errors and return consistent error responses to clients.

## Error Classes

The error handling system is built around a hierarchy of error classes:

- `ApiError`: The base error class for all API errors. It includes:
  - `statusCode`: The HTTP status code to return
  - `code`: A string error code for programmatic handling
  - `details`: Optional additional details about the error
  - `isOperational`: Whether the error is operational (expected) or not

Specialized error classes include:

- `NotFoundError`: For resources that don't exist (404)
- `ValidationError`: For invalid input data (400)
- `UnauthorizedError`: For authentication failures (401)
- `ForbiddenError`: For authorization failures (403)
- `ConflictError`: For resource conflicts (409)
- `DatabaseError`: For database errors (500)

## Usage

### Throwing Errors

```typescript
// Simple error
throw new NotFoundError("User not found");

// With details
throw new ValidationError("Invalid input", {
  fields: {
    email: "Invalid email format",
    password: "Password must be at least 8 characters",
  },
});
```

### Error Response Format

All errors are transformed into a consistent response format:

```json
{
  "success": false,
  "error": {
    "message": "Resource not found",
    "code": "NOT_FOUND",
    "statusCode": 404,
    "details": {
      // Optional additional details
    }
  }
}
```

## Error Codes

Error codes are defined in the `ErrorCode` enum and include:

- Generic errors: `UNKNOWN_ERROR`, `VALIDATION_ERROR`, `UNAUTHORIZED`, etc.
- Auth errors: `INVALID_CREDENTIALS`, `INVALID_TOKEN`, etc.
- User errors: `USER_NOT_FOUND`, `USER_ALREADY_EXISTS`, etc.
- Task errors: `TASK_NOT_FOUND`, etc.
- Database errors: `DATABASE_ERROR`, etc.

## Testing Error Endpoints

You can test the error handling system using the following endpoints:

- `GET /api/utils/errors/not-found`: Returns a 404 Not Found error
- `GET /api/utils/errors/validation`: Returns a 400 Validation error
- `GET /api/utils/errors/generic`: Returns a 500 Internal Server error
- `GET /api/utils/errors/elysia-validation/abc`: Returns a 400 Validation error (Elysia validation)
