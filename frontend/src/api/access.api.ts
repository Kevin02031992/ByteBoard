import api from "./axios";
import type { Access, AccessForm, CreateAccessResponse } from "../types/access";

// 🔹 Obtener todas las opciones de acceso
export const getAllAccess = async (): Promise<Access[]> => {
    const response = await api.get<{ success: boolean; data: Access[] }>("/access");
    return response.data.data;
};

// 🔹 Crear nueva opción
export const createAccess = async (
    formData: AccessForm
): Promise<{ data: CreateAccessResponse }> => {
    const response = await api.post("/access", formData);
    return { data: response.data as CreateAccessResponse };
};

// 🔹 Actualizar opción
export const updateAccess = async (accessId: string, formData: AccessForm):
    Promise<{ data: { message: string } }> => {
    return await api.put(`/access/${accessId}`, formData);
};

// 🔹 Eliminar opción (soft delete)
export const deleteAccess = async (accessId: string):
Promise<{ data: { message: string } }> => {
  return await api.delete(`/access/${accessId}`);
};
