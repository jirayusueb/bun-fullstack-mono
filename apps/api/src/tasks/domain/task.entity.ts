export interface Task {
  id: string
  title: string
  description: string | null
  completed: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateTaskDTO {
  title: string
  description?: string
  userId: string
}

export interface UpdateTaskDTO {
  title?: string
  description?: string
  completed?: boolean
}
