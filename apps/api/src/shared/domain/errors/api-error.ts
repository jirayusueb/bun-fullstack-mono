/**
 * HTTP status codes
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

/**
 * API error codes
 */
export enum ErrorCode {
  // Generic errors
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",

  // Auth errors
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_TOKEN = "INVALID_TOKEN",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",

  // User errors
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",

  // Task errors
  TASK_NOT_FOUND = "TASK_NOT_FOUND",

  // Database errors
  DATABASE_ERROR = "DATABASE_ERROR",
}

/**
 * Base API error class
 */
export class ApiError extends Error {
  public readonly statusCode: HttpStatus;
  public readonly code: ErrorCode;
  public readonly details?: Record<string, any>;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    details?: Record<string, any>,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Not found error
 */
export class NotFoundError extends ApiError {
  constructor(message = "Resource not found", details?: Record<string, any>) {
    super(message, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND, details);
  }
}

/**
 * Validation error
 */
export class ValidationError extends ApiError {
  constructor(message = "Validation error", details?: Record<string, any>) {
    super(message, HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR, details);
  }
}

/**
 * Unauthorized error
 */
export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", details?: Record<string, any>) {
    super(message, HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, details);
  }
}

/**
 * Forbidden error
 */
export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", details?: Record<string, any>) {
    super(message, HttpStatus.FORBIDDEN, ErrorCode.FORBIDDEN, details);
  }
}

/**
 * Conflict error
 */
export class ConflictError extends ApiError {
  constructor(
    message = "Resource already exists",
    details?: Record<string, any>
  ) {
    super(message, HttpStatus.CONFLICT, ErrorCode.CONFLICT, details);
  }
}

/**
 * Database error
 */
export class DatabaseError extends ApiError {
  constructor(message = "Database error", details?: Record<string, any>) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ErrorCode.DATABASE_ERROR,
      details,
      false
    );
  }
}
