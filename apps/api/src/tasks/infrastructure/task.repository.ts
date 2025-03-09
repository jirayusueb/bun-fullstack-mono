import type {
  CreateTaskDTO,
  Task,
  UpdateTaskDTO,
} from '@/tasks/domain/task.entity';
import { db } from '@/shared/infrastructure/db/client';
import { tasks } from '@/tasks/domain/schema';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';

export class TaskRepository {
  async findAll(userId: string): Promise<Task[]> {
    return (await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))) as Task[];
  }

  async findById(id: string): Promise<Task | null> {
    const result = (await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id))) as Task[];
    return result.length ? result[0] : null;
  }

  async create(data: CreateTaskDTO): Promise<Task> {
    const task = {
      id: createId(),
      title: data.title,
      description: data.description || null,
      completed: false,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Task;

    await db.insert(tasks).values(task);
    return task;
  }

  async update(id: string, data: UpdateTaskDTO): Promise<Task | null> {
    const task = await this.findById(id);
    if (!task)
      return null;

    const updatedTask = {
      ...task,
      ...data,
      updatedAt: new Date(),
    };

    await db.update(tasks).set(updatedTask).where(eq(tasks.id, id));
    return updatedTask;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(tasks).where(eq(tasks.id, id));
    return !!result;
  }
}
