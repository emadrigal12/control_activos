const ArticuloModel = require('../models/activoModel');

async function obtenerArticulos(req, res) {
  try {
    const articulos = await ArticuloModel.obtenerTodos();
    res.status(200).json(articulos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos: ' + error.message });
  }
}

async function crearArticulo(req, res) {
  try {
    const { Descripcion, Id_Categoria } = req.body;

    console.log(req.body)
    if (!Descripcion || !Id_Categoria) {
      return res.status(400).json({ message: 'Descripción y ID de Categoría son requeridos' });
    }
    const nuevoArticuloId = await ArticuloModel.crear({ Descripcion, Id_Categoria });
    res.status(201).json({ 
      message: 'Artículo creado exitosamente y registro de inventario inicializado', 
      id: nuevoArticuloId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el artículo: ' + error.message });
  }
}

async function actualizarArticulo(req, res) {
  try {
    const { id } = req.params;
    const { Descripcion, Id_Categoria } = req.body;
    if (!Descripcion || !Id_Categoria) {
      return res.status(400).json({ message: 'Descripción y ID de Categoría son requeridos' });
    }
    const articuloExistente = await ArticuloModel.obtenerPorId(id);
    if (!articuloExistente) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }
    const filasActualizadas = await ArticuloModel.actualizar(id, { Descripcion, Id_Categoria });
    if (filasActualizadas > 0) {
      res.status(200).json({ message: 'Artículo actualizado exitosamente' });
    } else {
      res.status(500).json({ message: 'Error al actualizar el artículo' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el artículo: ' + error.message });
  }
}

async function obtenerArticuloPorId(req, res) {
  try {
    const { id } = req.params;
    const articulo = await ArticuloModel.obtenerPorId(id);
    if (articulo) {
      res.status(200).json(articulo);
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el artículo: ' + error.message });
  }
}

async function eliminarArticulo(req, res) {
  try {
    const { id } = req.params;
    const articuloExistente = await ArticuloModel.obtenerPorId(id);
    if (!articuloExistente) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }
    const filasEliminadas = await ArticuloModel.eliminar(id);
    if (filasEliminadas > 0) {
      res.status(200).json({ message: 'Artículo y su registro de inventario eliminados exitosamente' });
    } else {
      res.status(500).json({ message: 'Error al eliminar el artículo' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el artículo: ' + error.message });
  }
}

module.exports = { 
  obtenerArticulos, 
  crearArticulo, 
  actualizarArticulo,
  obtenerArticuloPorId,
  eliminarArticulo
};