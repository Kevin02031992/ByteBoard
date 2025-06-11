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
  user_star,
  user_end,
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
      user_star,
      user_end,
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
    user_star,
    user_end,
    user_state,
    user_creationDate,
    user_creater,
    user_updateDate,
    user_updater,
    user_condition,
  ]);
};

// Exporta la función para ser usada en el controlador
module.exports = { user_create };
