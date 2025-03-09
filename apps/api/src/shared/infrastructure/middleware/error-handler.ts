import { ApiError, ErrorCode, HttpStatus } from "@/shared/domain/errors";
import { Elysia } from "elysia";

/**
 * Standard error response format
 */
interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
    details?: Record<string, any>;
  };
}

/**
 * Error handler middleware for Elysia
 */
export const errorHandler = new Elysia({ name: "error-handler" }).onError(
  ({ code, error, set }) => {
    console.error(`[ERROR] ${code}:`, error);

    // Handle ApiError instances
    if (error instanceof ApiError) {
      set.status = error.statusCode;

      const response: ErrorResponse = {
        success: false,
        error: {
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
          details: error.details,
        },
      };

      return response;
    }

    // Handle Elysia validation errors
    if (code === "VALIDATION") {
      set.status = HttpStatus.BAD_REQUEST;

      const response: ErrorResponse = {
        success: false,
        error: {
          message: "Validation error",
          code: ErrorCode.VALIDATION_ERROR,
          statusCode: HttpStatus.BAD_REQUEST,
          details: {
            validation: error.message,
          },
        },
      };

      return response;
    }

    // Handle Not Found errors
    if (code === "NOT_FOUND") {
      set.status = HttpStatus.NOT_FOUND;

      const response: ErrorResponse = {
        success: false,
        error: {
          message: "Resource not found",
          code: ErrorCode.NOT_FOUND,
          statusCode: HttpStatus.NOT_FOUND,
        },
      };

      return response;
    }

    // Handle all other errors as internal server errors
    set.status = HttpStatus.INTERNAL_SERVER_ERROR;

    // Get stack trace if available and in development mode
    const stackTrace =
      error instanceof Error && error.stack ? error.stack : undefined;

    const response: ErrorResponse = {
      success: false,
      error: {
        message: "Internal server error",
        code: ErrorCode.UNKNOWN_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        details:
          process.env.NODE_ENV === "development" && stackTrace
            ? { stack: stackTrace }
            : undefined,
      },
    };

    return response;
  }
);
