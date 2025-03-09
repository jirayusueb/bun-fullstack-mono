'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksKeys } from './keys';
import { CreateTaskPayload, Task, TaskCreateResponse, mockTasks } from './types';

/**
 * Hook for creating a new task
 *
 * @returns Mutation function to create a task
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: CreateTaskPayload) => {
      // In a real application, this would be an API call
      // const res = await clientApi.api.tasks.create.post({ body: newTask });
      // if (res.data.error) {
      //   throw new Error(res.data.error || 'Failed to create task');
      // }
      // return res.data.data;

      // Mock implementation with API response template
      const createdTask: Task = {
        ...newTask,
        id: `task-${Math.random().toString(36).substr(2, 9)}`,
        completed: false,
        description: newTask.description || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to mock data
      mockTasks.push(createdTask as any); // Use 'any' to bypass type check for mock data

      // Create API response
      const response: TaskCreateResponse = {
        data: createdTask,
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      return response.data;
    },
    onSuccess: (createdTask) => {
      // Update task list query
      queryClient.invalidateQueries({
        queryKey: tasksKeys.lists(createdTask.userId),
      });
    },
  });
}
