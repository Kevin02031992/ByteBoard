const db = require("../config/database");

// 🔍 Buscar usuario por identificación
const auth_findUserByIdentification = async (user_identification) => {
  const [rows] = await db.query(
    "SELECT * FROM user WHERE user_identification = ? AND user_condition = TRUE",
    [user_identification]
  );
  return rows;
};

module.exports = {
  auth_findUserByIdentification,
};
