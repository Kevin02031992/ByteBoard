import api from "./axios";
import type { User, CreateUserResponse } from "../types/user";


// 🔹 Llama al backend para crear un nuevo usuario
export const createUser = async (
  formData: FormData
): Promise<{ data: CreateUserResponse }> => {
  const response = await api.post("/user", formData);
  return { data: response.data as CreateUserResponse };
};


// 🔹 Llama al backend para obtener todos los usuarios activos
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<{ success: boolean; data: User[] }>("/user");
  return response.data.data; // ⬅️ devolvés solo el array de usuarios
};


// 🔹 Elimina lógicamente un usuario por ID (soft delete)
export const deleteUser = async (userId: string): Promise<{ data: { message: string } }> => {
  return await api.delete(`/user/${userId}`);
};


// 🔹 Actualiza los datos generales del usuario
export const updateUser = async (userId: string, formData: FormData): Promise<{ data: { message: string } }> => {
  return await api.put(`/user/${userId}`, formData);
};

