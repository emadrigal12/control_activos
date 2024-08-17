const UsuarioModel = require("../models/usuarioModel");

async function obtenerUsuarioPorId(req, res) {
  try {
    const usuario = await UsuarioModel.obtenerUsuarioPorId(req.params.id);
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

async function crearUsuario(req, res) {
  try {
    const { Username, Password, Nombre, Apellido, Rol_Id } = req.body;
    const nuevoUsuario = await UsuarioModel.crearUsuario({
      Username,
      Password,
      Nombre,
      Apellido,
      Rol_Id,
      Estado: 'A'
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario: " + error.message });
  }
}

async function cambiarEstadoUsuario(req, res) {
  try {
    const usuarioId = req.params.id;
    const { estado } = req.body;

    if (estado !== 'A' && estado !== 'I') {
      return res.status(400).json({ message: "Estado inválido." });
    }

    const usuario = await UsuarioModel.obtenerUsuarioPorId(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await UsuarioModel.cambiarEstadoUsuario(usuarioId, estado);
    res.status(200).json({ message: `Estado del usuario cambiado a ${estado === 'A' ? 'Activo' : 'Inactivo'}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al cambiar el estado del usuario: " + error.message });
  }
}


module.exports = { obtenerUsuarioPorId, crearUsuario, cambiarEstadoUsuario };