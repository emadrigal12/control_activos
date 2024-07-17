const ActivoModel = require('../models/activoModel');

async function obtenerActivos(req, res) {
  try {
    const activos = await ActivoModel.obtenerTodos();
    res.status(200).json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { obtenerActivos };