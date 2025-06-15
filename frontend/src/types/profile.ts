// 📦 Modelo completo de un perfil recibido desde el backend
export interface Profile {
  profile_id: string;
  profile_name: string;
  profile_description: string;
  profile_creationDate: string;
  profile_creater: string;
  profile_updateDate: string;
  profile_updater: string;
  profile_condition: boolean;
  profile_creater_name: string;
  profile_updater_name: string;
}

// 📥 Modelo del formulario para crear/editar perfil
export interface ProfileForm {
  profile_name: string;
  profile_description: string;
}

export interface CreateProfileResponse {
  profile_id: string;
  message: string;
  success: boolean;
}