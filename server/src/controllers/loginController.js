const connection = require("../models/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwt");

async function login(req, res) {
  const { username, password } = req.body;
  const query = "SELECT * FROM USUARIO WHERE Username = ? AND Password = ?";

  try {
    const [result] = await connection.execute(query, [username, password]);
    if (result.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = result[0];
    console.log(jwtConfig);

    const token = jwt.sign(
      { id: user.Id_Usuario, username: user.Username },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );

    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al autenticar usuario", error: error.message });
  }
}

module.exports = { login };
