# React Query Hooks (Legacy)

> **Note:** This directory is maintained for backward compatibility. New hooks should be added to the appropriate feature module in the `features/` directory.

This directory contains custom React Query hooks for data fetching, organized using the query key factory pattern. Most hooks have been moved to a feature-based architecture.

## Feature-Based Architecture

The application has moved to a feature-based architecture where hooks are organized by domain/feature rather than technical concern. See the [`features/`](../features/README.md) directory for the new structure.

```
features/
├── utils/api/                  # Utility features (API health, server time, etc.)
├── tasks/api/                  # Task management features
│   ├── use-task-list.ts        # Hook for fetching task lists
│   ├── use-task-detail.ts      # Hook for fetching a single task
│   └── ...                     # Other task-related hooks
├── users/api/                  # User management features
└── auth/api/                   # Authentication features
```

## One Hook, One API Principle

We follow the "One Hook, One API" principle, where each hook corresponds to exactly one API endpoint:

1. **Single Responsibility**: Each hook file is responsible for one API operation
2. **Naming Convention**: Hooks are named according to their function: `use[Resource][Operation]`
3. **Type Separation**: Common types are extracted to a `types.ts` file
4. **Import Specificity**: Components import only the hooks they need

## Query Key Factory Pattern

The query key factory pattern is a best practice for organizing query keys in React Query applications. It provides a structured approach to manage query keys in a type-safe way.

### Key Benefits

1. **Type Safety**: Ensures query keys are consistent and predictable
2. **Cache Invalidation**: Makes it easier to invalidate related queries
3. **Organization**: Groups query keys by domain or feature
4. **Maintenance**: Simplifies refactoring and changes to key structure

### Implementation Example

```typescript
// Example from features/tasks/api/keys.ts
const baseKey = ['api', 'tasks'] as const;

export const tasksKeys = {
  // Base key
  all: () => baseKey,

  // Task lists endpoint
  lists: (userId?: string) => [...tasksKeys.all(), { userId }] as const,

  // Task detail endpoint
  detail: (id: string) => [...tasksKeys.all(), 'detail', id] as const,
};
```

### Using in Hooks

```typescript
// Example hook with query key factory
export function useApiHealth(options?: UseQueryOptions<ApiHealthResult, Error>) {
  return useQuery<ApiHealthResult, Error>({
    queryKey: utilsKeys.health(),
    queryFn: async () => {
      // Implementation...
    },
    ...options,
  });
}
```

### Cache Invalidation Examples

```typescript
// Invalidate all tasks
queryClient.invalidateQueries({ queryKey: tasksKeys.all() });

// Invalidate a specific user's tasks
queryClient.invalidateQueries({ queryKey: tasksKeys.lists(userId) });

// Invalidate a specific task
queryClient.invalidateQueries({ queryKey: tasksKeys.detail(taskId) });
```

## Available Hooks

All hooks are now available through direct imports from their feature directories:

```typescript
// Direct imports from specific files
import { useApiHealth } from '@/features/utils/api/use-api-health';
import { useServerTime } from '@/features/utils/api/use-server-time';

// Task-related hooks
import { useTaskList } from '@/features/tasks/api/use-task-list';
import { useTaskDetail } from '@/features/tasks/api/use-task-detail';
import { useCreateTask } from '@/features/tasks/api/use-create-task';
import { useUpdateTask } from '@/features/tasks/api/use-update-task';
```

For backward compatibility, you can still import them from the hooks directory:

```typescript
// Legacy imports (maintains the original hook names)
import {
  useApiHealth,
  useServerTime,
  useTasks,       // This is useTaskList
  useTask,        // This is useTaskDetail
  useCreateTask,
  useUpdateTask
} from '@/hooks';
```

## Migrating to Feature-Based Architecture

1. Update imports to reference the specific feature files directly
2. Add new hooks to the appropriate feature module
3. Use the feature-specific query key factories

See the [features README](../features/README.md) for more details on the new structure.

## Best Practices

1. Always use the query key factory for defining query keys
2. Group related queries in the same namespace
3. Use parameters in query keys when appropriate
4. Keep the query key structure flat for simple queries
5. Use more complex structures for hierarchical data
6. Import directly from source files rather than using barrel files
7. Ensure all imports are explicit and avoid circular dependencies
8. Follow the One Hook, One API principle for better maintainability
