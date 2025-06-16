// 📥 Modelo de acceso asignado a un perfil
export interface ProfileAccess {
  profile_access_id: string;
  profile_id: string;
  access_id: string;
  access_name: string;
  access_description: string;
  access_path: string;
  access_type: number;

  profile_access_creationDate: string;
  profile_access_creater: string;
  profile_access_updateDate: string;
  profile_access_updater: string;
  profile_access_condition: boolean;

  profile_access_creater_name: string;
  profile_access_updater_name: string;
}

// ➕ Payload para asignar acceso a perfil
export interface ProfileAccessPayload {
  profile_id: string;
  access_id: string;
}

export interface CreateProfileAccessResponse {
  profile_access_id: string;
  message: string;
  success: boolean;
}