'use client';

import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { tasksKeys } from './keys';
import { Task, TaskDetailResponse, mockTasks } from './types';

/**
 * Hook for querying a single task by ID
 *
 * @param taskId - The ID of the task to fetch
 * @param options - React Query options
 * @returns Query result with task data
 */
export function useTaskDetail(
  taskId: string,
  options?: Omit<UseQueryOptions<Task, Error, Task>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Task, Error>({
    queryKey: tasksKeys.detail(taskId),
    queryFn: async () => {
      // In a real application, this would be an API call
      // const res = await clientApi.api.tasks.detail.get({ params: { id: taskId } });
      // if (res.data.error) {
      //   throw new Error(res.data.error || 'Unknown error');
      // }
      // return res.data.data;

      // Mock implementation with API response template
      const task = mockTasks.find(t => t.id === taskId);

      if (!task) {
        const errorResponse: TaskDetailResponse = {
          data: null as any,
          error: `Task with ID ${taskId} not found`
        };
        throw new Error(errorResponse.error || 'Unknown error');
      }

      const response: TaskDetailResponse = {
        data: task as Task,
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      return response.data;
    },
    ...options,
  });
}
