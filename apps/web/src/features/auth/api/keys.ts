/**
 * Auth feature query key factory
 */

// Base keys for auth
const baseKey = ['api', 'auth'] as const;

export const authKeys = {
  // Base key
  all: () => baseKey,

  // Session endpoint
  session: () => [...authKeys.all(), 'session'] as const,

  // Authenticated user endpoint
  user: () => [...authKeys.all(), 'user'] as const,
};
