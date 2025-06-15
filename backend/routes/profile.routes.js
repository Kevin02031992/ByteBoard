const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  profileCreate,
  profileGetAll,
  profileUpdate,
  profileDelete,
} = require("../controllers/profile.controller");

// 🔹 Crear nuevo perfil
router.post("/", authenticateToken, profileCreate);

// 🔹 Obtener todos los perfiles activos
router.get("/", authenticateToken, profileGetAll);

// 🔄 Actualizar perfil
router.put("/:id", authenticateToken, profileUpdate);

// ❌ Eliminación lógica (soft delete)
router.delete("/:id", authenticateToken, profileDelete);

module.exports = router;
