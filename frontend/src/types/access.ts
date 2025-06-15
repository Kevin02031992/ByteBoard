// 📦 Modelo completo de una opción de acceso (lo que devuelve el backend)
export interface Access {
  access_id: string;
  access_name: string;
  access_description: string;
  access_path: string;
  access_type: number;
  access_creationDate: string;
  access_creater: string;
  access_updateDate: string;
  access_updater: string;
  access_condition: boolean;
  access_creater_name: string;
  access_updater_name: string;
}

// 📥 Modelo del formulario de creación/edición
export interface AccessForm {
  access_name: string;
  access_description: string;
  access_path: string;
  access_type: number;
}

export interface CreateAccessResponse {
  access_id: string;
  message: string;
  success: boolean;
}