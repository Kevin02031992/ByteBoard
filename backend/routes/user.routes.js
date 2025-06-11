// Importa express para poder crear un enrutador modular
const express = require("express");

// Crea una nueva instancia de router de Express
const router = express.Router();

// Importa el controlador que maneja la lógica 
const { userCreate, userGetAll } = require("../controllers/user.controller");


router.post("/", userCreate);
router.get("/", userGetAll);

// Exporta el router para que pueda ser usado en el archivo index.js
module.exports = router;
