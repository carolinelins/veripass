import { api } from "./api"

interface AuthResponse {
  message: string
  token?: string
  userId?: number
}

export const register = async (identifier: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/register", { identifier, password })
  return response.data
}

export const login = async (identifier: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/login", { identifier, password })
  return response.data
}
