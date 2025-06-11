// config/database.js
const mysql = require("mysql2/promise");

// Crea un pool de conexiones a la base de datos usando variables del archivo .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
