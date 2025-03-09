/**
 * Hooks index file
 * Re-exports hooks from feature modules for backward compatibility
 */

// Re-export utility hooks
export * from '@/features/utils/api/use-api-health';
export * from '@/features/utils/api/use-server-time';

// Re-export task hooks
export * from '@/features/tasks/api/types';
export * from '@/features/tasks/api/use-task-list';
export * from '@/features/tasks/api/use-task-detail';
export * from '@/features/tasks/api/use-create-task';
export * from '@/features/tasks/api/use-update-task';

// Re-export shared API utilities
export * from '@/features/shared/api/types';
export * from '@/features/shared/api/use-api-error';
export * from '@/features/shared/api/transform-response';

// For backward compatibility, export task hooks with their original names
export { useTaskList as useTasks } from '@/features/tasks/api/use-task-list';
export { useTaskDetail as useTask } from '@/features/tasks/api/use-task-detail';

/**
 * This is a demonstration file showing how to use the key factory pattern
 * with React Query. The key factory pattern helps organize query keys in a
 * hierarchical and structured way.
 *
 * Key benefits:
 * 1. Type safety - TypeScript helps ensure query keys are consistent
 * 2. Easier cache invalidation - Related queries can be invalidated together
 * 3. Better organization - Keys are grouped by domain/feature
 * 4. Refactoring support - Changes to key structure are easier to manage
 *
 * Usage examples:
 *
 * 1. Simple query:
 *    queryKey: apiKeys.utils.health()
 *
 * 2. Query with parameters:
 *    queryKey: apiKeys.tasks.lists(userId)
 *
 * 3. Detail query:
 *    queryKey: apiKeys.tasks.detail(taskId)
 *
 * 4. Cache invalidation:
 *    - Invalidate all tasks: queryClient.invalidateQueries({ queryKey: apiKeys.tasks.all() })
 *    - Invalidate a user's tasks: queryClient.invalidateQueries({ queryKey: apiKeys.tasks.lists(userId) })
 *    - Invalidate a specific task: queryClient.invalidateQueries({ queryKey: apiKeys.tasks.detail(taskId) })
 */
