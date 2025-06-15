const { generateUniqueId } = require("../utils/generateId.util");
const {
  access_create,
  access_getAll,
  access_update,
  access_delete,
} = require("../queries/access.queries");

// 🔹 Crear nueva opción
const accessCreate = async (req, res) => {
  try {
    const access_id = await generateUniqueId("access", "access_id");
    const {
      access_name,
      access_description,
      access_path,
      access_type,
    } = req.body;

    const now = new Date();
    const access_creationDate = now;
    const access_updateDate = now;
    const access_creater = req.user.user_id;
    const access_updater = req.user.user_id;
    const access_condition = true;

    await access_create(
      access_id,
      access_name,
      access_description,
      access_path,
      access_type,
      access_creationDate,
      access_creater,
      access_updateDate,
      access_updater,
      access_condition
    );

    res.status(201).json({
      success: true,
      message: "Opción registrada correctamente",
      access_id,
    });
  } catch (error) {
    console.error("❌ Error en accessCreate:", error);
    res.status(500).json({ success: false, message: "Error al registrar la opción" });
  }
};

// 🔍 Obtener todas las opciones activas
const accessGetAll = async (req, res) => {
  try {
    const accesses = await access_getAll();
    res.status(200).json({ success: true, data: accesses });
  } catch (error) {
    console.error("❌ Error en accessGetAll:", error);
    res.status(500).json({ success: false, message: "Error al obtener accesos" });
  }
};

// 🔄 Actualizar opción
const accessUpdate = async (req, res) => {
  try {
    const access_id = req.params.id;
    const {
      access_name,
      access_description,
      access_path,
      access_type,
    } = req.body;

    const now = new Date();
    const access_updateDate = now;
    const access_updater = req.user.user_id;

    await access_update({
      access_id,
      access_name,
      access_description,
      access_path,
      access_type,
      access_updateDate,
      access_updater,
    });

    res.status(200).json({ success: true, message: "Opción actualizada correctamente" });
  } catch (error) {
    console.error("❌ Error en accessUpdate:", error);
    res.status(500).json({ success: false, message: "Error al actualizar la opción" });
  }
};

// ❌ Eliminación lógica
const accessDelete = async (req, res) => {
  try {
    const access_id = req.params.id;
    await access_delete(access_id);
    res.status(200).json({ success: true, message: "Opción eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error en accessDelete:", error);
    res.status(500).json({ success: false, message: "Error al eliminar la opción" });
  }
};

module.exports = {
  accessCreate,
  accessGetAll,
  accessUpdate,
  accessDelete,
};
