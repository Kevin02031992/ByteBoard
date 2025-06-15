const { generateUniqueId } = require("../utils/generateId.util");
const {
  profile_create,
  profile_getAll,
  profile_update,
  profile_delete,
} = require("../queries/profile.queries");

// 🔹 Crear nuevo perfil
const profileCreate = async (req, res) => {
  try {
    const profile_id = await generateUniqueId("profile", "profile_id");
    const { profile_name, profile_description } = req.body;

    const now = new Date();
    const profile_creationDate = now;
    const profile_updateDate = now;
    const profile_creater = req.user.user_id;
    const profile_updater = req.user.user_id;
    const profile_condition = true;

    await profile_create(
      profile_id,
      profile_name,
      profile_description,
      profile_creationDate,
      profile_creater,
      profile_updateDate,
      profile_updater,
      profile_condition
    );

    res.status(201).json({
      success: true,
      message: "Perfil registrado correctamente",
      profile_id,
    });
  } catch (error) {
    console.error("❌ Error en profileCreate:", error);
    res.status(500).json({ success: false, message: "Error al registrar perfil" });
  }
};

// 🔍 Obtener todos los perfiles activos
const profileGetAll = async (req, res) => {
  try {
    const data = await profile_getAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error en profileGetAll:", error);
    res.status(500).json({ success: false, message: "Error al obtener perfiles" });
  }
};

// 🔄 Actualizar perfil
const profileUpdate = async (req, res) => {
  try {
    const profile_id = req.params.id;
    const { profile_name, profile_description } = req.body;
    const profile_updateDate = new Date();
    const profile_updater = req.user.user_id;

    await profile_update({
      profile_id,
      profile_name,
      profile_description,
      profile_updateDate,
      profile_updater,
    });

    res.status(200).json({ success: true, message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error en profileUpdate:", error);
    res.status(500).json({ success: false, message: "Error al actualizar perfil" });
  }
};

// ❌ Eliminación lógica
const profileDelete = async (req, res) => {
  try {
    const profile_id = req.params.id;
    await profile_delete(profile_id);
    res.status(200).json({ success: true, message: "Perfil eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error en profileDelete:", error);
    res.status(500).json({ success: false, message: "Error al eliminar perfil" });
  }
};

module.exports = {
  profileCreate,
  profileGetAll,
  profileUpdate,
  profileDelete,
};
