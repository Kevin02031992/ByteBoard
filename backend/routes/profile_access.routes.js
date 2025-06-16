const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  profileAccessCreate,
  profileAccessGetByProfile,
  profileAccessDelete,
} = require("../controllers/profile_access.controller");

// 🔹 Obtener accesos asignados a un perfil
router.get("/:profile_id", authenticateToken, profileAccessGetByProfile);

// ➕ Asignar acceso a un perfil
router.post("/", authenticateToken, profileAccessCreate);

// ❌ Eliminar acceso de perfil (soft delete)
router.delete("/:profile_access_id", authenticateToken, profileAccessDelete);

module.exports = router;
