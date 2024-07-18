const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

exports.validateToken = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó token de autenticación" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    res.status(200).json({ message: "Token válido" });
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
