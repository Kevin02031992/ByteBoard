// Importa express para crear el servidor HTTP
const express = require('express');

// Importa cors para permitir peticiones desde otros orígenes (como el frontend en otro puerto)
const cors = require('cors');

// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importa las rutas relacionadas con usuarios
const userRoutes = require('./routes/user.routes');

// Crea la instancia principal del servidor Express
const app = express();

// Middleware para que Express pueda leer JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware para habilitar CORS (permite comunicación entre frontend y backend)
app.use(cors());

// Monta las rutas del usuario bajo el prefijo /api/user
// Ejemplo: POST http://localhost:3001/api/user
app.use('/api/user', userRoutes);

// Define el puerto del servidor a partir de las variables de entorno o por defecto 3001
const PORT = process.env.PORT || 3001;

// Inicia el servidor y muestra un mensaje en consola
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
