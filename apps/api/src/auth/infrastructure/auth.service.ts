import { account, session, verification } from '@/auth/domain/schema';
import { db } from '@/shared/infrastructure/db/client';
import { users } from '@/users/domain/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  schema: {
    user: users,
    session,
    account,
    verification,
  },
  usePlural: true,
  emailAndPassword: {
    enabled: true,
  },
});
