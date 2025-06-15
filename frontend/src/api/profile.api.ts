import api from "./axios";
import type { Profile, ProfileForm, CreateProfileResponse } from "../types/profile";

// 🔹 Obtener todos los perfiles activos
export const getAllProfiles = async (): Promise<Profile[]> => {
  const response = await api.get<{ success: boolean; data: Profile[] }>("/profile");
    return response.data.data;
};

// 🔹 Crear nuevo perfil
export const createProfile = async (
       formData: ProfileForm
): Promise<{ data: CreateProfileResponse }> => {
    const response = await api.post("/profile", formData);
    return { data: response.data as CreateProfileResponse };
};


// 🔄 Actualizar perfil
export const updateProfile = async (profileId: string, formData: ProfileForm):
    Promise<{ data: { message: string } }> => {
    return await api.put(`/profile/${profileId}`, formData);
};

// ❌ Eliminar perfil (soft delete)
export const deleteProfile = async (profileId: string):
Promise<{ data: { message: string } }> => {
  return await api.delete(`/profile/${profileId}`);
};
