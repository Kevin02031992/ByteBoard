const db = require("../config/database");

// 🔹 Crear opción
const access_create = async (
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
) => {
  const sql = `
    INSERT INTO access (
      access_id, access_name, access_description, access_path, access_type,
      access_creationDate, access_creater, access_updateDate, access_updater, access_condition
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await db.execute(sql, [
    access_id,
    access_name,
    access_description,
    access_path,
    access_type,
    access_creationDate,
    access_creater,
    access_updateDate,
    access_updater,
    access_condition,
  ]);
};

// 🔍 Obtener accesos activos
const access_getAll = async () => {
  const sql = `
    SELECT * FROM access
    WHERE access_condition = true
  `;
  const [rows] = await db.execute(sql);
  return rows;
};

// 🔄 Actualizar acceso
const access_update = async (data) => {
  const {
    access_id,
    access_name,
    access_description,
    access_path,
    access_type,
    access_updateDate,
    access_updater,
  } = data;

  const sql = `
    UPDATE access SET
      access_name = ?,
      access_description = ?,
      access_path = ?,
      access_type = ?,
      access_updateDate = ?,
      access_updater = ?
    WHERE access_id = ?
  `;
  await db.execute(sql, [
    access_name,
    access_description,
    access_path,
    access_type,
    access_updateDate,
    access_updater,
    access_id,
  ]);
};

// ❌ Soft delete
const access_delete = async (access_id) => {
  const sql = `
    UPDATE access
    SET access_condition = false
    WHERE access_id = ?
  `;
  await db.execute(sql, [access_id]);
};

module.exports = {
  access_create,
  access_getAll,
  access_update,
  access_delete,
};
