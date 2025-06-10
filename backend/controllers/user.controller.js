// Importa la utilidad para generar IDs únicos de 10 caracteres
const { generateUniqueId } = require("../utils/generateId.util");

// Importa la función query que inserta un usuario en la base de datos
const { user_create } = require("../queries/user.queries");

// Función controladora que se encarga de crear un nuevo usuario
// Esta función será llamada desde la ruta POST /api/user
const userCreate = async (req, res) => {
  // Extrae los datos del cuerpo de la petición
  const { user_name, user_mail } = req.body;

  try {
    // Genera un ID único para el nuevo usuario, de 10 caracteres
    const user_id = await generateUniqueId("user", "user_id");

    // Inserta el usuario en la base de datos llamando a la query user_create
    await user_create(user_id, user_name, user_mail);

    // Responde con estado 201 (creado) y mensaje de éxito
    res.status(201).json({ message: "Usuario creado correctamente" });

  } catch (err) {
    // Si ocurre un error, lo muestra en consola y responde con estado 500
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Exporta la función controladora para ser usada en las rutas
module.exports = { userCreate };
