import type {
  CreateTaskDTO,
  Task,
  UpdateTaskDTO,
} from '@/tasks/domain/task.entity';
import { TaskRepository } from '@/tasks/infrastructure/task.repository';

export class TaskUseCase {
  private repository: TaskRepository;

  constructor() {
    this.repository = new TaskRepository();
  }

  async getAllTasks(userId: string): Promise<Task[]> {
    return await this.repository.findAll(userId);
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await this.repository.findById(id);
  }

  async createTask(data: CreateTaskDTO): Promise<Task> {
    return await this.repository.create(data);
  }

  async updateTask(id: string, data: UpdateTaskDTO): Promise<Task | null> {
    return await this.repository.update(id, data);
  }

  async deleteTask(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
