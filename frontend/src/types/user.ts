// 🧾 Estructura del formulario para crear usuario
export interface UserForm {
  user_identification: string;
  user_name: string;
  user_companyMail: string;
  user_personalMail: string;
  user_phone1: string;
  user_phone2: string;
  user_addres: string;
  user_birthday: string;
  user_picture: string;
  user_password: string;
  user_startDate: string;
  user_endDate: string | null; 
}

// 👤 Tipo completo de usuario (excepto contraseñas)
export interface User {
  user_id: string;
  user_identification: string;
  user_name: string;
  user_companyMail: string;
  user_personalMail: string;
  user_phone1: string;
  user_phone2: string;
  user_addres: string;
  user_birthday: string;
  user_picture: string;
  user_passwordType: number;
  user_passwordDays: number;
  user_passwordTries: number;
  user_vacationDays: number;
  user_lastConection: string;
  user_startDate: string;
  user_endDate: string | null;
  user_state: number;
  user_creationDate: string;
  user_creater: string;
  user_updateDate: string;
  user_updater: string;
  user_condition: boolean;
}
