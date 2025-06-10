// Importa express para poder crear un enrutador modular
const express = require("express");

// Crea una nueva instancia de router de Express
const router = express.Router();

// Importa el controlador que maneja la lógica para crear un usuario
const { userCreate } = require("../controllers/user.controller");

// Ruta tipo POST para crear un nuevo usuario
// Esta ruta escucha en: POST /api/user
router.post("/", userCreate);

// Exporta el router para que pueda ser usado en el archivo index.js
module.exports = router;
