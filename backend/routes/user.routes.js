// Importa express para poder crear un enrutador modular
const express = require("express");

// Crea una nueva instancia de router de Express
const router = express.Router();

// Importa el controlador que maneja la lógica 
const { 
    userCreate, 
    userGetAll, 
    userUpdate, 
    userDelete 
} = require("../controllers/user.controller");


// 🔹 Crear nuevo usuario
router.post("/", userCreate);

// 🔹 Obtener todos los usuarios
router.get("/", userGetAll);

// 🔹 Actualizar usuario existente
router.put("/:id", userUpdate); 

// 🔹 Eliminar usuario (soft delete)
router.delete("/:id", userDelete); 


// Exporta el router para que pueda ser usado en el archivo index.js
module.exports = router;
