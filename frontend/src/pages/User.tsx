import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { createUser, getAllUsers, deleteUser, updateUser } from "../api/user.api";
import type { UserForm, User } from "../types/user";

// 🧱 Componente para usuario
const UserPage = () => {
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
    user_startDate: "",
    user_endDate: "",
  });

  // 📦 Estado para usuarios registrados
  const [users, setUsers] = useState<User[]>([]);
  // 🖊️ Indica si estamos editando un usuario existente
  const [isEditing, setIsEditing] = useState(false);
  // 🆔 Guarda el ID del usuario que se está editando
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // 🔄 Función para cargar usuarios desde la API
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // 🧠 Maneja la eliminación lógica de un usuario
  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      await deleteUser(id);
      // 🔄 Recargar lista de usuarios después del delete
      fetchUsers();

    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("No se pudo eliminar el usuario");
    }
  };

  // ✏️ Llena el formulario con los datos del usuario a editar
  const handleEdit = (user: User) => {
    setIsEditing(true);
    setEditingUserId(user.user_id);

    setFormData({
      user_identification: user.user_identification,
      user_name: user.user_name,
      user_companyMail: user.user_companyMail,
      user_personalMail: user.user_personalMail || "",
      user_phone1: user.user_phone1,
      user_phone2: user.user_phone2 || "",
      user_addres: user.user_addres || "",
      user_birthday: user.user_birthday,
      user_picture: user.user_picture || "",
      user_startDate: user.user_startDate,
      user_endDate: user.user_endDate,
      user_password: "", // dejamos esto vacío ya que no se edita aquí
    });
  };


  // 🔁 Cargar usuarios al montar
  useEffect(() => {
    fetchUsers();
  }, []);

  // 🖊️ Maneja los cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📤 Envía el formulario al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingUserId) {
        await updateUser(editingUserId, formData);
        alert("✅ Usuario actualizado correctamente");
      } else {
        const res = await createUser(formData);
        alert(`✅ Usuario creado con ID: ${res.data.user_id}`);
      }
      setIsEditing(false);
      setEditingUserId(null);
      setFormData({
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
        user_startDate: "",
        user_endDate: "",
      });
      fetchUsers();
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      alert("❌ Error al guardar usuario");
    }
  };


  return (
    <>
      <Navbar />
      <div className="container py-4">

        <h2 className="h4 fw-bold mb-4">Crear nuevo usuario</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input type="text" name="user_identification" placeholder="Cédula" onChange={handleChange} value={formData.user_identification} className="form-control" required />
          </div>
          <div className="col-md-6">
            <input type="text" name="user_name" placeholder="Nombre completo" onChange={handleChange} value={formData.user_name} className="form-control" required />
          </div>
          <div className="col-md-6">
            <input type="email" name="user_companyMail" placeholder="Correo institucional" onChange={handleChange} value={formData.user_companyMail} className="form-control" required />
          </div>
          <div className="col-md-6">
            <input type="email" name="user_personalMail" placeholder="Correo personal" onChange={handleChange} value={formData.user_personalMail} className="form-control" />
          </div>
          <div className="col-md-6">
            <input type="text" name="user_phone1" placeholder="Teléfono 1" onChange={handleChange} value={formData.user_phone1} className="form-control" required />
          </div>
          <div className="col-md-6">
            <input type="text" name="user_phone2" placeholder="Teléfono 2" onChange={handleChange} value={formData.user_phone2} className="form-control" />
          </div>
          <div className="col-md-12">
            <input type="text" name="user_addres" placeholder="Dirección" onChange={handleChange} value={formData.user_addres} className="form-control" />
          </div>
          <div className="col-md-4">
            <input type="date" name="user_birthday" onChange={handleChange} value={formData.user_birthday} className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="user_picture" placeholder="Ruta de imagen" onChange={handleChange} value={formData.user_picture} className="form-control" />
          </div>
          <div className="col-md-4">
            <input type="password" name="user_password" placeholder="Contraseña" onChange={handleChange} value={formData.user_password} className="form-control" required />
          </div>
          <div className="col-md-6">
            <input type="date" name="user_startDate" onChange={handleChange} value={formData.user_startDate} className="form-control" />
          </div>
          <div className="col-md-6">
            <input type="date" name="user_endDate" onChange={handleChange} value={formData.user_endDate || ""} className="form-control" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Crear usuario</button>
          </div>
        </form>

        <hr className="my-5" />

        <h2 className="h5 fw-bold mb-3">Usuarios registrados</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_companyMail}</td>
                  <td>{user.user_phone1}</td>
                  <td>
                    {user.user_state === 1 ? "Activo" : user.user_state === 2 ? "Inactivo" : "Suspendido"}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn btn-warning btn-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.user_id)}
                        className="btn btn-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};

export default UserPage;
