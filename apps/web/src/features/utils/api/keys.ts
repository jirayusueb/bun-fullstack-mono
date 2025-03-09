/**
 * Utils feature query key factory
 */

// Base keys for utils
const baseKey = ['api', 'utils'] as const;

export const utilsKeys = {
  // Base key
  all: () => baseKey,

  // Health check endpoint
  health: () => [...utilsKeys.all(), 'health'] as const,

  // Server time endpoint
  time: () => [...utilsKeys.all(), 'time'] as const,
};
