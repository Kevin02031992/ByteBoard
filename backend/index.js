// Importa express para crear el servidor HTTP
const express = require('express');

// Importa cors para permitir peticiones desde otros orígenes (como el frontend en otro puerto)
const cors = require('cors');
const path = require("path");
// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importa las rutas
const userRoutes = require('./routes/user.routes');
const authRoutes = require("./routes/auth.routes");
const accessRoutes = require("./routes/access.routes");
const profileRoutes = require("./routes/profile.routes");
const profileAccessRoutes = require("./routes/profile_access.routes");

// Crea la instancia principal del servidor Express
const app = express();

// Middleware para que Express pueda leer JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware para habilitar CORS (permite comunicación entre frontend y backend)
app.use(cors());

// Monta las rutas
app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/profile-access", profileAccessRoutes);

// Define el puerto del servidor a partir de las variables de entorno o por defecto 3001
const PORT = process.env.PORT || 3001;

// Inicia el servidor y muestra un mensaje en consola
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// 🧩 Línea para servir archivos estáticos
app.use("/multimedia", express.static(path.join(__dirname, "multimedia")));
