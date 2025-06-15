const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  accessCreate,
  accessGetAll,
  accessUpdate,
  accessDelete,
} = require("../controllers/access.controller");

// 🔹 Crear nueva opción
router.post("/", authenticateToken, accessCreate);

// 🔹 Obtener todas las opciones activas
router.get("/", authenticateToken, accessGetAll);

// 🔄 Actualizar opción
router.put("/:id", authenticateToken, accessUpdate);

// ❌ Eliminación lógica
router.delete("/:id", authenticateToken, accessDelete);

module.exports = router;
