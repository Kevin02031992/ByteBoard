// En user.queries.js
const pool = require("../config/database");


// 🔹 Query para crear un nuevo usuario
// Recibe todos los campos de la tabla 'user'
const user_create = async (
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
) => {
  const sql = `
    INSERT INTO user (
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await pool.query(sql, [
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
    user_condition,
  ]);
};

// 🔹 Query para obtener todos los usuarios activos sin campos de contraseña
const user_getAll = async () => {
  const sql = `
    SELECT 
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
    FROM user
    WHERE user_condition = true
  `;
  const [rows] = await pool.query(sql);
  return rows;
};

// 🔹 Actualiza la información de un usuario según su ID
const user_update = async (
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
) => {
  const sql = `
    UPDATE user SET
      user_identification = ?,
      user_name = ?,
      user_companyMail = ?,
      user_personalMail = ?,
      user_phone1 = ?,
      user_phone2 = ?,
      user_addres = ?,
      user_birthday = ?,
      user_picture = ?,
      user_startDate = ?,
      user_endDate = ?,
      user_updateDate = ?,
      user_updater = ?
    WHERE user_id = ?
  `;

  await pool.query(sql, [
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
  ]);
};

// 🔹 Desactiva lógicamente un usuario (soft delete)
const user_delete = async (user_id) => {
  const sql = `
    UPDATE user
    SET user_condition = false
    WHERE user_id = ?
  `;
  await pool.query(sql, [user_id]);
};

// Exporta la función para ser usada en el controlador
module.exports = {
  user_create,
  user_getAll,
  user_update,
  user_delete, 
};
