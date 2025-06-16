const { generateUniqueId } = require("../utils/generateId.util");
const {
  profile_access_create,
  profile_access_getByProfile,
  profile_access_delete,
} = require("../queries/profile_access.queries");

// ➕ Asignar acceso a un perfil
const profileAccessCreate = async (req, res) => {
  try {
    const profile_access_id = await generateUniqueId(
      "profile_access",
      "profile_access_id"
    );
    const { profile_id, access_id } = req.body;

    const now = new Date();
    const profile_access_creationDate = now;
    const profile_access_updateDate = now;
    const profile_access_creater = req.user.user_id;
    const profile_access_updater = req.user.user_id;
    const profile_access_condition = true;

    await profile_access_create(
      profile_access_id,
      profile_id,
      access_id,
      profile_access_creationDate,
      profile_access_creater,
      profile_access_updateDate,
      profile_access_updater,
      profile_access_condition
    );

    res.status(201).json({
      success: true,
      message: "Acceso asignado correctamente al perfil",
    });
  } catch (error) {
    console.error("❌ Error en profileAccessCreate:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al asignar acceso" });
  }
};

// 🔍 Obtener accesos asignados a un perfil
const profileAccessGetByProfile = async (req, res) => {
  try {
    const { profile_id } = req.params;
    const data = await profile_access_getByProfile(profile_id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error en profileAccessGetByProfile:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener accesos del perfil" });
  }
};

// ❌ Soft delete
const profileAccessDelete = async (req, res) => {
  try {
    const { profile_access_id } = req.params;
    await profile_access_delete(profile_access_id);
    res
      .status(200)
      .json({ success: true, message: "Acceso eliminado del perfil" });
  } catch (error) {
    console.error("❌ Error en profileAccessDelete:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar acceso del perfil" });
  }
};

module.exports = {
  profileAccessCreate,
  profileAccessGetByProfile,
  profileAccessDelete,
};
