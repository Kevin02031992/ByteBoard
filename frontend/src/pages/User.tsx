import { useState } from "react";
import axios from "axios";

// Interfaz para definir el tipo de respuesta que devuelve el backend
interface CreateUserResponse {
  message: string;
}

// Componente principal del formulario para crear un nuevo usuario
function User() {
  // Estado para almacenar el nombre del usuario
  const [user_name, setUserName] = useState<string>("");

  // Estado para almacenar el correo electrónico del usuario
  const [user_mail, setUserMail] = useState<string>("");

  // Función para enviar los datos al backend y crear un usuario
  const handleCreateUser = async () => {
    try {
      // Envia la solicitud al backend y define el tipo de respuesta esperada
      const res = await axios.post<CreateUserResponse>(
        "http://localhost:3001/api/user",
        {
          user_name,
          user_mail,
        }
      );

      // Muestra un mensaje de éxito con lo que devuelve el backend
      alert(res.data.message + " ✅");

      // Limpia los campos después de crear el usuario
      setUserName("");
      setUserMail("");
    } catch (err) {
      // Muestra una alerta si ocurre un error
      alert("❌ Error al crear el usuario");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      {/* Título de la página */}
      <h1 className="text-2xl font-bold text-gray-800">Crear nuevo usuario</h1>

      {/* Campo de entrada para el nombre */}
      <input
        type="text"
        placeholder="Nombre del usuario"
        className="border p-2 rounded w-80"
        value={user_name}
        onChange={(e) => setUserName(e.target.value)}
      />

      {/* Campo de entrada para el correo */}
      <input
        type="email"
        placeholder="Correo electrónico"
        className="border p-2 rounded w-80"
        value={user_mail}
        onChange={(e) => setUserMail(e.target.value)}
      />

      {/* Botón para crear el usuario */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={handleCreateUser}
      >
        Crear Usuario
      </button>
    </div>
  );
}

export default User;
