/**
 * Server time response type
 */
export interface ServerTimeResponse {
  /**
   * ISO 8601 formatted time string
   * @example "2023-03-09T12:34:56.789Z"
   */
  time: string;

  /**
   * Unix timestamp in seconds
   * @example 1678365296
   */
  unix: number;

  /**
   * Human-readable formatted time string
   * @example "3/9/2023, 12:34:56 PM"
   */
  formatted: string;
}

/**
 * API health response type
 */
export interface ApiHealthResponse {
  /**
   * Status of the API
   * @example "ok"
   */
  status: string;

  /**
   * ISO 8601 formatted timestamp
   * @example "2023-03-09T12:34:56.789Z"
   */
  timestamp: string;

  /**
   * Server uptime in seconds
   * @example 3600
   */
  uptime: number;

  /**
   * API version
   * @example "1.0.0"
   */
  version: string;

  /**
   * Environment the API is running in
   * @example "development"
   */
  environment: string;
}
