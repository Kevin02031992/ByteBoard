// Importa el pool de conexión para realizar consultas
const mysql = require("mysql2/promise");
require("dotenv").config();

// Crea el pool de conexión
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Función para generar un ID alfanumérico de 10 caracteres
const createRandomId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Función principal para generar un ID único en la tabla y campo dados
const generateUniqueId = async (tableName, primaryKeyField) => {
  let unique = false;
  let newId = "";

  while (!unique) {
    newId = createRandomId(); // Genera un nuevo ID

    // Construye y ejecuta la consulta para ver si el ID ya existe
    const [rows] = await pool.query(
      `SELECT COUNT(*) as count FROM \`${tableName}\` WHERE \`${primaryKeyField}\` = ?`,
      [newId]
    );

    // Si count === 0, el ID no existe, así que es único
    if (rows[0].count === 0) {
      unique = true;
    }
  }

  return newId;
};

// Exporta la función
module.exports = { generateUniqueId };
