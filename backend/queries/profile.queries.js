const db = require("../config/database");

// 🔹 Crear nuevo perfil
const profile_create = async (
  profile_id,
  profile_name,
  profile_description,
  profile_creationDate,
  profile_creater,
  profile_updateDate,
  profile_updater,
  profile_condition
) => {
  const sql = `
    INSERT INTO profile (
      profile_id,
      profile_name,
      profile_description,
      profile_creationDate,
      profile_creater,
      profile_updateDate,
      profile_updater,
      profile_condition
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await db.execute(sql, [
    profile_id,
    profile_name,
    profile_description,
    profile_creationDate,
    profile_creater,
    profile_updateDate,
    profile_updater,
    profile_condition,
  ]);
};

// 🔍 Obtener todos los perfiles activos con nombre de quien creó y actualizó
const profile_getAll = async () => {
  const sql = `
    SELECT 
      p.*,
      u1.user_name AS profile_creater_name,
      u2.user_name AS profile_updater_name
    FROM profile p
    LEFT JOIN user u1 ON u1.user_id = p.profile_creater
    LEFT JOIN user u2 ON u2.user_id = p.profile_updater
    WHERE p.profile_condition = true
  `;
  const [rows] = await db.execute(sql);
  return rows;
};

// 🔄 Actualizar perfil
const profile_update = async (data) => {
  const {
    profile_id,
    profile_name,
    profile_description,
    profile_updateDate,
    profile_updater,
  } = data;

  const sql = `
    UPDATE profile SET
      profile_name = ?,
      profile_description = ?,
      profile_updateDate = ?,
      profile_updater = ?
    WHERE profile_id = ?
  `;
  await db.execute(sql, [
    profile_name,
    profile_description,
    profile_updateDate,
    profile_updater,
    profile_id,
  ]);
};

// ❌ Soft delete
const profile_delete = async (profile_id) => {
  const sql = `
    UPDATE profile
    SET profile_condition = false
    WHERE profile_id = ?
  `;
  await db.execute(sql, [profile_id]);
};

module.exports = {
  profile_create,
  profile_getAll,
  profile_update,
  profile_delete,
};
