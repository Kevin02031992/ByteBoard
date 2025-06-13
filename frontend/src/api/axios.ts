// src/api/axios.ts
import axios from "axios";

// 🧱 Instancia base de Axios para consumir la API del backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Cargado desde .env
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor para agregar token JWT automáticamente en cada petición
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    // Asegura que headers no sea undefined
    if (!config.headers) {
      config.headers = {};
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 🚨 Interceptor para detectar respuestas no autorizadas (401)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
