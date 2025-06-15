const db = require("../config/database");

// 🔎 Buscar usuario solo para login
const auth_findUserByIdentification = async (user_identification) => {
  const [rows] = await pool.query(
    `SELECT user_id, user_name, user_password
     FROM user
     WHERE user_identification = ? AND user_condition = 1`,
    [user_identification]
  );
  return rows;
};

module.exports = { auth_findUserByIdentification };
