import api from "./axios";
import type { ProfileAccess, ProfileAccessPayload, } from "../types/profile_access";


// 📥 Obtener todos los accesos asignados a un perfil
export const getProfileAccessByProfile = async (
  profile_id: string
): Promise<ProfileAccess[]> => {
  const response = await api.get<{ success: boolean; data: ProfileAccess[] }>(
    `/profile-access/${profile_id}`
  );
  return response.data.data;
};

// ➕ Asignar un acceso a un perfil
export const createProfileAccess = async (payload: ProfileAccessPayload) => {
  const { data } = await api.post("/profile-access", payload);
  return data;
};

// ❌ Eliminar acceso del perfil (soft delete)
export const deleteProfileAccess = async (
  profile_access_id: string
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(
    `/profile-access/${profile_access_id}`
  );
  return response.data;
};
