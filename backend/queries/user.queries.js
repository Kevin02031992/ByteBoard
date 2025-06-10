// Importa mysql2 con soporte para promesas
const mysql = require("mysql2/promise");

// Carga variables de entorno desde .env
require("dotenv").config();

// Crea un pool de conexiones a la base de datos usando los datos de .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Host del servidor MySQL
  user: process.env.DB_USER,       // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME    // Nombre de la base de datos
});

// Función que inserta un nuevo usuario en la tabla 'user'
// Recibe: user_id (string), user_name (string), user_mail (string)
const user_create = async (user_id, user_name, user_mail) => {
  const sql = "INSERT INTO user (user_id, user_name, user_mail) VALUES (?, ?, ?)";
  await pool.query(sql, [user_id, user_name, user_mail]);
};

// Exporta la función para ser usada en el controlador
module.exports = { user_create };
