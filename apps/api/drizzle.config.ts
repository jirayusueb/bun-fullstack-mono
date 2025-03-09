import { env } from '@/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/users/domain/schema.ts',
    './src/tasks/domain/schema.ts',
    './src/auth/domain/schema.ts',
  ],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
