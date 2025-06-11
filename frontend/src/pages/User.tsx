// src/pages/User.tsx

import { useState } from "react";
import { createUser } from "../api/user.api";
import type { UserForm } from "../types/user";

// 🧱 Componente para crear usuario
const User = () => {
  // 🎯 Estado local del formulario
  const [formData, setFormData] = useState<UserForm>({
    user_identification: "",
    user_name: "",
    user_companyMail: "",
    user_personalMail: "",
    user_phone1: "",
    user_phone2: "",
    user_addres: "",
    user_birthday: "",
    user_picture: "",
    user_password: "",
  });

  // 🖊️ Maneja los cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📤 Envía el formulario al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUser(formData);
      alert(`✅ Usuario creado con ID: ${res.data.user_id}`);
    } catch (err) {
      console.error("Error al crear usuario:", err);
      alert("❌ Error al crear usuario");
    }
  };


  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear nuevo usuario</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="user_identification" placeholder="Cédula" onChange={handleChange} value={formData.user_identification} className="p-2 border rounded" required />
        <input type="text" name="user_name" placeholder="Nombre completo" onChange={handleChange} value={formData.user_name} className="p-2 border rounded" required />
        <input type="email" name="user_companyMail" placeholder="Correo institucional" onChange={handleChange} value={formData.user_companyMail} className="p-2 border rounded" required />
        <input type="email" name="user_personalMail" placeholder="Correo personal" onChange={handleChange} value={formData.user_personalMail} className="p-2 border rounded" />
        <input type="text" name="user_phone1" placeholder="Teléfono 1" onChange={handleChange} value={formData.user_phone1} className="p-2 border rounded" required />
        <input type="text" name="user_phone2" placeholder="Teléfono 2" onChange={handleChange} value={formData.user_phone2} className="p-2 border rounded" />
        <input type="text" name="user_addres" placeholder="Dirección" onChange={handleChange} value={formData.user_addres} className="p-2 border rounded" />
        <input type="date" name="user_birthday" onChange={handleChange} value={formData.user_birthday} className="p-2 border rounded" required />
        <input type="text" name="user_picture" placeholder="Ruta de imagen" onChange={handleChange} value={formData.user_picture} className="p-2 border rounded" />
        <input type="password" name="user_password" placeholder="Contraseña" onChange={handleChange} value={formData.user_password} className="p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Crear usuario</button>
      </form>
    </div>
  );
};

export default User;