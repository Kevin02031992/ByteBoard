const jwt = require("jsonwebtoken");

// Middleware que valida el token JWT del usuario
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Esperamos el header en formato: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token no enviado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido o expirado." });
    }

    // Guardamos los datos del usuario en la request
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
