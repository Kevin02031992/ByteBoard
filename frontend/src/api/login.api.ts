import axios from "axios";
import type { LoginResponse } from "../types/login"; 

// 🔐 Login de usuario
export const loginUser = async (
  user_identification: string,
  user_password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${import.meta.env.VITE_API_URL}/auth/login`, {
    user_identification,
    user_password,
  });
  return response.data;
};
