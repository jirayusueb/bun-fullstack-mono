'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksKeys } from './keys';
import { Task, TaskUpdate, TaskUpdateResponse, mockTasks } from './types';

/**
 * Hook for updating a task
 *
 * @returns Mutation function to update a task
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TaskUpdate }) => {
      // In a real application, this would be an API call
      // const res = await clientApi.api.tasks.update.patch({ params: { id }, body: updates });
      // if (res.data.error) {
      //   throw new Error(res.data.error || 'Failed to update task');
      // }
      // return res.data.data;

      // Mock implementation
      const taskIndex = mockTasks.findIndex(task => task.id === id);

      if (taskIndex === -1) {
        const errorResponse: TaskUpdateResponse = {
          data: null as any,
          error: `Task with ID ${id} not found`
        };
        throw new Error(errorResponse.error || 'Unknown error');
      }

      const existingTask = mockTasks[taskIndex];

      if (!existingTask) {
        const errorResponse: TaskUpdateResponse = {
          data: null as any,
          error: `Task with ID ${id} not found`
        };
        throw new Error(errorResponse.error || 'Unknown error');
      }

      // Create updated task with type safety
      const updatedTask: Task = {
        id: existingTask.id,
        userId: existingTask.userId,
        createdAt: existingTask.createdAt,
        title: updates.title !== undefined ? updates.title : existingTask.title,
        description: updates.description !== undefined ? updates.description : existingTask.description,
        completed: updates.completed !== undefined ? updates.completed : existingTask.completed,
        updatedAt: new Date().toISOString(),
      };

      // Update mock data
      mockTasks[taskIndex] = updatedTask as any; // Use 'any' to bypass type check for mock data

      // Create API response
      const response: TaskUpdateResponse = {
        data: updatedTask,
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      return response.data;
    },
    onSuccess: (updatedTask) => {
      // Update task in the cache
      queryClient.invalidateQueries({
        queryKey: tasksKeys.detail(updatedTask.id),
      });

      // Invalidate task lists that might contain this task
      queryClient.invalidateQueries({
        queryKey: tasksKeys.lists(updatedTask.userId),
      });
    },
  });
}
