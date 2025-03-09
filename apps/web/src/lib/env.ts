import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Server-side environment variables schema
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    API_URL: z.string().url().default('http://localhost:8000'),
  },
  /**
   * Client-side environment variables schema
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:8000'),
  },
  /**
   * Skip validation of environment variables in development
   */
  skipValidation: process.env.NODE_ENV === 'development',
  /**
   * For Next.js >= 13.4.4, you only need to destructure client variables
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
