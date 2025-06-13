// Importa express para poder crear un enrutador modular
const express = require("express");

// Crea una nueva instancia de router de Express
const router = express.Router();

// Crea una instacia para autenticar token
const authenticateToken = require('../middlewares/authenticateToken');

// Importa el controlador que maneja la lógica 
const { 
    userCreate, 
    userGetAll, 
    userUpdate, 
    userDelete 
} = require("../controllers/user.controller");


// 🔹 Crear nuevo usuario
router.post("/", authenticateToken, userCreate);

// 🔹 Obtener todos los usuarios
router.get("/", authenticateToken, userGetAll);

// 🔹 Actualizar usuario existente
router.put("/:id", authenticateToken, userUpdate); 

// 🔹 Eliminar usuario (soft delete)
router.delete("/:id", authenticateToken, userDelete); 


// Exporta el router para que pueda ser usado en el archivo index.js
module.exports = router;
