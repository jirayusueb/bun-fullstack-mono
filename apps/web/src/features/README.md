# Feature-based Architecture

This directory organizes the application code into feature modules, each containing its own API hooks, query keys, and other related components.

## Structure

```
features/
├── utils/           # Utility features (API health, server time, etc.)
│   └── api/         # API-related code
│       ├── keys.ts                # Query keys for utils
│       ├── use-api-health.ts      # API health hook
│       └── use-server-time.ts     # Server time hook
│
├── tasks/           # Task management features
│   └── api/         # API-related code
│       ├── keys.ts                # Query keys for tasks
│       ├── types.ts               # Type definitions for tasks
│       ├── use-task-list.ts       # Hook for fetching task lists
│       ├── use-task-detail.ts     # Hook for fetching a single task
│       ├── use-create-task.ts     # Hook for creating a task
│       └── use-update-task.ts     # Hook for updating a task
│
├── users/           # User management features
│   └── api/         # API-related code
│       └── keys.ts                # Query keys for users
│
└── auth/            # Authentication features
    └── api/         # API-related code
        └── keys.ts                # Query keys for auth
```

## Feature Module Structure

Each feature module follows these principles:

- **api/**: Contains API-related code
  - **keys.ts**: Query key factory for this feature
  - **types.ts**: Type definitions for the feature (when needed)
  - **use-[endpoint].ts**: One hook per API endpoint

## One Hook, One API Principle

Each hook corresponds to exactly one API endpoint, making the code more modular and easier to maintain:

- Each file exports a single hook that handles a specific API operation
- Hooks are named according to their function: `use[Resource][Operation]`
- Types are extracted to a separate file to avoid duplication

## Query Key Factory Pattern

Each feature implements its own query key factory in `api/keys.ts`:

```typescript
// Example from tasks/api/keys.ts
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

## API Hooks

Each API endpoint gets its own dedicated hook file:

```typescript
// Example from tasks/api/use-task-list.ts
export function useTaskList(userId: string) {
  return useQuery({
    queryKey: tasksKeys.lists(userId),
    queryFn: async () => {
      // Implementation...
    },
  });
}
```

## Usage

Import hooks directly from their specific files:

```typescript
// Direct imports from specific files
import { useApiHealth } from '@/features/utils/api/use-api-health';
import { useTaskList } from '@/features/tasks/api/use-task-list';
import { useTaskDetail } from '@/features/tasks/api/use-task-detail';
import { useCreateTask } from '@/features/tasks/api/use-create-task';
import { useUpdateTask } from '@/features/tasks/api/use-update-task';
import { Task } from '@/features/tasks/api/types';

// Legacy imports (for backward compatibility)
import { useApiHealth, useTasks, useTask, useCreateTask, useUpdateTask, Task } from '@/hooks';
```

## Benefits

1. **Organization**: Code is organized by domain/feature rather than by technical concern
2. **Encapsulation**: Each feature is self-contained with its own query keys, hooks, and types
3. **Discoverability**: Easier to find related code in one place
4. **Maintainability**: Changes to one feature don't affect others
5. **Scalability**: New features can be added without modifying existing code
6. **Tree-shaking**: Direct imports allow better tree-shaking for smaller bundles
7. **Import clarity**: Direct imports make dependencies explicit
8. **Avoiding circular dependencies**: Reduced risk of circular dependencies
9. **Single responsibility**: Each file has a single, clear purpose
10. **Testing**: Easier to mock and test individual API endpoints
