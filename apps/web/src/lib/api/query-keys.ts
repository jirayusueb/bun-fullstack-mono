/**
 * Query key factory for API endpoints
 * This pattern helps organize and manage query keys in a structured way
 */
import { utilsKeys } from '@/features/utils/api/keys';
import { tasksKeys } from '@/features/tasks/api/keys';
import { usersKeys } from '@/features/users/api/keys';
import { authKeys } from '@/features/auth/api/keys';

// Root API keys
export const apiKeys = {
  // Base key for all API related queries
  all: ['api'] as const,

  // Feature namespaces
  utils: utilsKeys,
  tasks: tasksKeys,
  users: usersKeys,
  auth: authKeys,
};

// Re-export individual feature keys
export { utilsKeys, tasksKeys, usersKeys, authKeys };
