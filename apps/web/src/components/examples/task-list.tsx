'use client';

import { useState } from 'react';
import { Task } from '@/features/tasks/api/types';
import { useTaskList } from '@/features/tasks/api/use-task-list';
import { useCreateTask } from '@/features/tasks/api/use-create-task';
import { useUpdateTask } from '@/features/tasks/api/use-update-task';
import { useApiError } from '@/features/shared/api/use-api-error';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

function TaskItem({ task, onToggleComplete }: TaskItemProps) {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id, !task.completed)}
      />
      <div className={`task-content ${task.completed ? 'completed' : ''}`}>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className="task-meta">
        <small>Updated: {new Date(task.updatedAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
}

export function TaskList() {
  const userId = 'user1'; // This would normally come from auth context
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // API error handling
  const { error: apiError, handleApiError, clearError } = useApiError();

  // Use hooks from the tasks feature
  const { data: tasks = [], isLoading, error } = useTaskList(userId);
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  // Handle errors from React Query
  if (error) {
    handleApiError(error);
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    clearError(); // Clear any previous errors
    createTaskMutation.mutate(
      {
        title: newTaskTitle,
        description: null,
        userId,
      },
      {
        onError: handleApiError
      }
    );

    setNewTaskTitle('');
  };

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    clearError(); // Clear any previous errors
    updateTaskMutation.mutate(
      {
        id: taskId,
        updates: { completed }
      },
      {
        onError: handleApiError
      }
    );
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="task-list">
      <h2>My Tasks</h2>

      {/* Show API error if any */}
      {apiError && (
        <div className="error-message">
          <p>{apiError.message}</p>
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}

      <form onSubmit={handleCreateTask} className="new-task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          type="submit"
          disabled={createTaskMutation.isPending}
        >
          {createTaskMutation.isPending ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task above!</p>
      ) : (
        <div className="tasks">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
