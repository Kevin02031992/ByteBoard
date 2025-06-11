import api from "./axios";
import type { UserForm, User } from "../types/user";

// 🔁 Estructura esperada como respuesta al crear usuario
export interface CreateUserResponse {
  success: boolean;
  message: string;
  user_id: string;
}

// 🔹 Llama al backend para crear un nuevo usuario
export const createUser = (data: UserForm) =>
  api.post<CreateUserResponse>("/api/user", data);

// 🔹 Llama al backend para obtener todos los usuarios activos
export const getAllUsers = () =>
  api.get<{ success: boolean; data: User[] }>("/api/user");
