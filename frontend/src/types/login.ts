// 🧾 Tipo de respuesta del login
export interface LoginResponse {
  token: string;
  user: {
    user_id: string;
    user_name: string;
    // Agrega más campos si quieres autocompletar
  };
}
