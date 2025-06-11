// src/api/axios.ts
import axios from "axios";

// 🧱 Instancia base de Axios para consumir la API del backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Cargado desde .env
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 5000, // Opcional: puedes agregar timeout si es necesario
});

export default api;