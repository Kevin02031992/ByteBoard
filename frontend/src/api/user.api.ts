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
  api.post<CreateUserResponse>("/user", data);

// 🔹 Llama al backend para obtener todos los usuarios activos
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<{ success: boolean; data: User[] }>("/user");
  return response.data.data; // ⬅️ devolvés solo el array de usuarios
};


// 🔹 Elimina lógicamente un usuario por ID (soft delete)
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/user/${id}`);
};

// 🔹 Actualiza los datos generales del usuario
export const updateUser = async (id: string, data: Partial<UserForm>): Promise<void> => {
  await api.put(`/user/${id}`, data);
};