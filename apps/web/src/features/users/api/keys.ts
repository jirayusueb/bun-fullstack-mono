/**
 * Users feature query key factory
 */

// Base keys for users
const baseKey = ['api', 'users'] as const;

export const usersKeys = {
  // Base key
  all: () => baseKey,

  // User detail endpoint
  detail: (id: string) => [...usersKeys.all(), 'detail', id] as const,

  // User profile endpoint
  profile: () => [...usersKeys.all(), 'profile'] as const,
};
