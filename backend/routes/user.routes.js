// Importa express para poder crear un enrutador modular
const express = require("express");
const router = express.Router();

// Middleware para verificar el token JWT
const authenticateToken = require("../middlewares/authenticateToken");

// Multer para manejo de archivos
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Controladores
const {
  userCreate,
  userGetAll,
  userUpdate,
  userDelete,
} = require("../controllers/user.controller");

// 📦 Configurar almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "multimedia/profiles_pictures";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const tempName = `temp_${Date.now()}${ext}`; // Este nombre será reemplazado en backend si hace falta
    cb(null, tempName);
  },
});

const upload = multer({ storage });

// 🔹 Crear usuario
router.post("/", authenticateToken, upload.single("user_picture"), userCreate);

// 🔹 Obtener todos los usuarios
router.get("/", authenticateToken, userGetAll);

// 🔹 Actualizar usuario existente (incluye imagen)
router.put(
  "/:id",
  authenticateToken,
  upload.single("user_picture"),
  userUpdate
);

// 🔹 Eliminar usuario (soft delete)
router.delete("/:id", authenticateToken, userDelete);

// Exportar router
module.exports = router;
