const UsuarioModel = require("../models/usuarioModel");

async function obtenerUsuarioPorId(req, res) {
  try {
    // Obtiene el ID del usuario desde los parámetros de la solicitud
    const usuario = await UsuarioModel.obtenerUsuarioPorId(req.params.id);

    // Verifica si el usuario existe
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario: " + error.message });
  }
}

module.exports = { obtenerUsuarioPorId };
