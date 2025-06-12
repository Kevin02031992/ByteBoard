// Importa la utilidad para generar IDs únicos de 10 caracteres
const { generateUniqueId } = require("../utils/generateId.util");

// Importa la función de queries
const {
  user_create,
  user_getAll,
  user_update,
  user_delete
} = require("../queries/user.queries");

// 🔹 Controlador para crear un nuevo usuario
const userCreate = async (req, res) => {
  try {
    const user_id = await generateUniqueId("user", "user_id");

    // 📌 Datos recibidos del frontend
    const {
      user_identification,
      user_name,
      user_companyMail,
      user_personalMail,
      user_phone1,
      user_phone2,
      user_addres,
      user_birthday,
      user_picture,
      user_password,
    } = req.body;

    // 📌 Valores controlados desde backend
    const now = new Date();
    const user_password1 = null;
    const user_password2 = null;
    const user_password3 = null;
    const user_passwordType = 1;
    const user_passwordDays = 60;
    const user_passwordTries = 0;
    const user_vacationDays = 0;
    const user_lastConection = now;
    const user_startDate = now;
    const user_endDate = null;
    const user_state = 1;
    const user_creationDate = now;
    const user_creater = "admin"; // Temporalmente fijo
    const user_updateDate = now;
    const user_updater = "admin"; // Temporalmente fijo
    const user_condition = true;

    // 📌 Ejecutar query
    await user_create(
      user_id,
      user_identification,
      user_name,
      user_companyMail,
      user_personalMail,
      user_phone1,
      user_phone2,
      user_addres,
      user_birthday,
      user_picture,
      user_password,
      user_password1,
      user_password2,
      user_password3,
      user_passwordType,
      user_passwordDays,
      user_passwordTries,
      user_vacationDays,
      user_lastConection,
      user_startDate,
      user_endDate,
      user_state,
      user_creationDate,
      user_creater,
      user_updateDate,
      user_updater,
      user_condition
    );

    res.status(201).json({
      success: true,
      message: "Usuario creado correctamente",
      user_id,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear usuario",
    });
  }
};

// 🔹 Controlador para obtener todos los usuarios activos
const userGetAll = async (req, res) => {
  try {
    const users = await user_getAll();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener usuarios",
    });
  }
};

// 🔹 Actualiza datos generales del usuario
const userUpdate = async (req, res) => {
  try {
    // Obtenemos los datos del cuerpo de la solicitud
    const user_id = req.params.id;
    const {
      user_identification,
      user_name,
      user_companyMail,
      user_personalMail,
      user_phone1,
      user_phone2,
      user_addres,
      user_birthday,
      user_picture,
      user_startDate,
      user_endDate,
    } = req.body;

    // Valores controlados desde backend
    const user_updateDate = new Date();
    const user_updater = "admin";

    // Ejecutamos el query con los datos
    await user_update(
      user_identification,
      user_name,
      user_companyMail,
      user_personalMail,
      user_phone1,
      user_phone2,
      user_addres,
      user_birthday,
      user_picture,
      user_startDate,
      user_endDate,
      user_updateDate,
      user_updater,
      user_id
    );

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error en userUpdate:", error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

// 🔹 Elimina lógicamente un usuario (soft delete)
const userDelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Falta el ID del usuario." });
    }

    await user_delete(id);

    res.status(200).json({ message: "Usuario desactivado correctamente" });
  } catch (error) {
    console.error("Error en userDelete:", error);
    res.status(500).json({ message: "Error al desactivar el usuario" });
  }
};

// Exporta la función controladora para ser usada en las rutas
module.exports = {
  userCreate,
  userGetAll,
  userUpdate,
  userDelete,
};
