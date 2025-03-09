import { env } from '@/env';
import { Elysia } from 'elysia';

export const utilController = new Elysia({ prefix: '/api/utils' })
  // Health check endpoint
  .get(
    '/health',
    () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: env.NODE_ENV,
    }),
    {
      detail: {
        tags: ['utils'],
        description: 'Health check endpoint',
      },
    },
  )

  // Get current server time
  .get(
    '/time',
    () => ({
      time: new Date().toISOString(),
      unix: Date.now(),
      formatted: new Date().toLocaleString(),
    }),
    {
      detail: {
        tags: ['utils'],
        description: 'Get current server time',
      },
    },
  )

  // Echo endpoint - returns whatever is sent
  .post(
    '/echo',
    ({ body }: { body: unknown }) => ({
      received: body,
      timestamp: new Date().toISOString(),
    }),
    {
      detail: {
        tags: ['utils'],
        description: 'Echo back the request body',
      },
    },
  );
