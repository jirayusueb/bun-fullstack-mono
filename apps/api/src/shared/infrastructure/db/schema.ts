import { account, session, verification } from '@/auth/domain/schema';
import { tasks } from '@/tasks/domain/schema';
import { users } from '@/users/domain/schema';

export { account, session, tasks, users, verification };

// Export all schemas for migrations
export const schemas = [users, tasks, session, account, verification];
