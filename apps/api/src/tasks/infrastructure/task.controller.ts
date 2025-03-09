import { TaskUseCase } from '@/tasks/application/task.use-case';
import { Elysia, t } from 'elysia';

export const taskController = new Elysia({ prefix: '/api/tasks' })
  .use((app) => {
    return app.decorate('taskUseCase', new TaskUseCase());
  })

  // Get all tasks for a user
  .get(
    '/',
    async ({ taskUseCase, query }) => {
      const userId = query.userId;
      if (!userId) {
        return { error: 'userId is required' };
      }

      return await taskUseCase.getAllTasks(userId);
    },
    {
      query: t.Object({
        userId: t.String(),
      }),
    },
  )

  // Get a task by id
  .get(
    '/:id',
    async ({ taskUseCase, params }) => {
      const task = await taskUseCase.getTaskById(params.id);

      if (!task) {
        return { error: 'Task not found' };
      }

      return task;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )

  // Create a new task
  .post(
    '/',
    async ({ taskUseCase, body }) => {
      return await taskUseCase.createTask(body);
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.Optional(t.String()),
        userId: t.String(),
      }),
    },
  )

  // Update a task
  .patch(
    '/:id',
    async ({ taskUseCase, params, body }) => {
      const task = await taskUseCase.updateTask(params.id, body);

      if (!task) {
        return { error: 'Task not found' };
      }

      return task;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        title: t.Optional(t.String()),
        description: t.Optional(t.String()),
        completed: t.Optional(t.Boolean()),
      }),
    },
  )

  // Delete a task
  .delete(
    '/:id',
    async ({ taskUseCase, params }) => {
      const success = await taskUseCase.deleteTask(params.id);

      if (!success) {
        return { error: 'Task not found or could not be deleted' };
      }

      return { success: true };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  );
