/**
 * Task-related type definitions
 */

import { ApiResponse, PaginatedApiResponse, ApiSuccessResponse } from '@/features/shared/api/types';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string | null;
  userId: string;
}

export type TaskUpdate = {
  title?: string;
  description?: string | null;
  completed?: boolean;
};

// API Response Types
export type TaskListResponse = ApiResponse<Task[]>;
export type TaskDetailResponse = ApiResponse<Task>;
export type TaskCreateResponse = ApiResponse<Task>;
export type TaskUpdateResponse = ApiResponse<Task>;
export type TaskDeleteResponse = ApiSuccessResponse;

// Paginated API Response (for future use)
export type TaskPaginatedListResponse = PaginatedApiResponse<Task>;

// Mock data for demonstrations and tests
export const mockTasks = [
  {
    id: '1',
    title: 'Learn React Query',
    description: 'Study the documentation and build something',
    completed: false,
    userId: 'user1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Set up Next.js project',
    description: 'Create a new project with the app router',
    completed: true,
    userId: 'user1',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
  },
];
