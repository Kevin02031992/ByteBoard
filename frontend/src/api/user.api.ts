import api from "./axios";
import type { UserForm } from "../types/user";

// 🔁 Estructura esperada como respuesta al crear usuario
export interface CreateUserResponse {
  success: boolean;
  message: string;
  user_id: string;
}

// 🔹 Llama al backend para crear un nuevo usuario
export const createUser = (data: UserForm) =>
  api.post<CreateUserResponse>("/api/user", data);
