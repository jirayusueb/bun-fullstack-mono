export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDTO {
  name: string
  email: string
  password?: string
}

export interface UpdateUserDTO {
  name?: string
  email?: string
  image?: string
}
