const db = require("../config/database");

// ➕ Crear nueva asignación
const profile_access_create = async (
  profile_access_id,
  profile_id,
  access_id,
  creationDate,
  creater,
  updateDate,
  updater,
  condition
) => {
  const sql = `
    INSERT INTO profile_access (
      profile_access_id,
      profile_id,
      access_id,
      profile_access_creationDate,
      profile_access_creater,
      profile_access_updateDate,
      profile_access_updater,
      profile_access_condition
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await db.execute(sql, [
    profile_access_id,
    profile_id,
    access_id,
    creationDate,
    creater,
    updateDate,
    updater,
    condition,
  ]);
};

// 🔍 Obtener accesos asignados a un perfil
const profile_access_getByProfile = async (profile_id) => {
  const sql = `
    SELECT 
      pa.*,
      a.access_name,
      a.access_description,
      a.access_path,
      a.access_type,
      u1.user_name AS profile_access_creater_name,
      u2.user_name AS profile_access_updater_name
    FROM profile_access pa
    LEFT JOIN access a ON a.access_id = pa.access_id
    LEFT JOIN user u1 ON u1.user_id = pa.profile_access_creater
    LEFT JOIN user u2 ON u2.user_id = pa.profile_access_updater
    WHERE pa.profile_access_condition = true
      AND pa.profile_id = ?
  `;
  const [rows] = await db.execute(sql, [profile_id]);
  return rows;
};

// ❌ Soft delete
const profile_access_delete = async (profile_access_id) => {
  const sql = `
    UPDATE profile_access
    SET profile_access_condition = false
    WHERE profile_access_id = ?
  `;
  await db.execute(sql, [profile_access_id]);
};

module.exports = {
  profile_access_create,
  profile_access_getByProfile,
  profile_access_delete,
};
