const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { auth_findUserByIdentification } = require("../queries/auth.queries");

// 🧠 Login de usuario
const loginUser = async (req, res) => {
  const { user_identification, user_password } = req.body;

  try {
    const rows = await auth_findUserByIdentification(user_identification);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado o inactivo." });
    }

    const user = rows[0];

    // 🔐 Comparar contraseña con el hash almacenado
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // 🎟️ Crear token
    const token = jwt.sign(
      { user_id: user.user_id, user_name: user.user_name },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

module.exports = { loginUser };
