// Importa express para poder crear un enrutador modular
const express = require("express");

// Crea una nueva instancia de router de Express
const router = express.Router();

// Crea una instacia para autenticar token
const authenticateToken = require("../middlewares/authenticateToken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


// Importa el controlador que maneja la lógica
const {
  userCreate,
  userGetAll,
  userUpdate,
  userDelete,
} = require("../controllers/user.controller");

// Configurar almacenamiento para multer
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
    const tempName = `temp_${Date.now()}${ext}`;
    cb(null, tempName);
  }
});

const upload = multer({ storage });

router.post("/", authenticateToken, upload.single("user_picture"), userCreate);

// 🔹 Obtener todos los usuarios
router.get("/", authenticateToken, userGetAll);

// 🔹 Actualizar usuario existente
router.put("/:id", authenticateToken, userUpdate);

// 🔹 Eliminar usuario (soft delete)
router.delete("/:id", authenticateToken, userDelete);

// Exporta el router para que pueda ser usado en el archivo index.js
module.exports = router;
