'use client';

import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { tasksKeys } from './keys';
import { Task, TaskListResponse, mockTasks } from './types';

/**
 * Hook for querying tasks for a specific user
 *
 * @param userId - The ID of the user whose tasks to fetch
 * @param options - React Query options
 * @returns Query result with tasks array
 */
export function useTaskList(
  userId: string,
  options?: Omit<UseQueryOptions<Task[], Error, Task[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Task[], Error>({
    queryKey: tasksKeys.lists(userId),
    queryFn: async () => {
      // In a real application, this would be an API call
      // const res = await clientApi.api.tasks.get({ params: { userId } });
      // if (res.data.error) {
      //   throw new Error(res.data.error);
      // }
      // return res.data.data;

      // Mock implementation with API response template
      const response: TaskListResponse = {
        data: mockTasks.filter(task => task.userId === userId) as Task[],
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      // Simulate error handling
      if (response.error) {
        throw new Error(response.error);
      }

      return response.data;
    },
    ...options,
  });
}
