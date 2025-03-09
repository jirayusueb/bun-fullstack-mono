/**
 * Tasks feature query key factory
 */

// Base keys for tasks
const baseKey = ['api', 'tasks'] as const;

export const tasksKeys = {
  // Base key
  all: () => baseKey,

  // Task lists endpoint (optionally filtered by userId)
  lists: (userId?: string) => [...tasksKeys.all(), { userId }] as const,

  // Task detail endpoint
  detail: (id: string) => [...tasksKeys.all(), 'detail', id] as const,
};
