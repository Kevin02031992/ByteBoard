// En user.queries.js
const db = require("../config/database");

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

  await db.execute(sql, [
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
  const [rows] = await db.execute(sql);
  return rows;
};

// 🔹 Actualiza la información de un usuario según su ID
const user_update = async (data) => {
  const {
    userId,
    user_identification,
    user_name,
    user_companyMail,
    user_personalMail,
    user_phone1,
    user_phone2,
    user_addres,
    user_birthday,
    user_startDate,
    user_endDate,
    user_updater,
    user_updateDate,
    user_picture, // string con ruta o '' si se elimina
  } = data;

  const safe = (val) => (val === undefined ? null : val);

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
      user_startDate = ?,
      user_endDate = ?,
      user_updater = ?,
      user_updateDate = ?,
      user_picture = ?
    WHERE user_id = ?
  `;

  const params = [
    safe(user_identification),
    safe(user_name),
    safe(user_companyMail),
    safe(user_personalMail),
    safe(user_phone1),
    safe(user_phone2),
    safe(user_addres),
    user_birthday === "" ? null : user_birthday,
    user_startDate === "" ? null : user_startDate,
    user_endDate === "" ? null : user_endDate,
    safe(user_updater),
    safe(user_updateDate),
    safe(user_picture || ""),
    userId,
  ];

  await db.execute(sql, params);
};

// 🔹 Desactiva lógicamente un usuario (soft delete)
const user_delete = async (user_id) => {
  const sql = `
    UPDATE user
    SET user_condition = false
    WHERE user_id = ?
  `;
  await db.execute(sql, [user_id]); // usamos 'db' si ya cambiaste de 'pool'
};

// Exporta la función para ser usada en el controlador
module.exports = {
  user_create,
  user_getAll,
  user_update,
  user_delete,
};
