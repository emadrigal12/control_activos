const ProyectoModel = require("../models/proyectoModel");

async function crearProyecto(req, res) {
  try {
    const nuevoProyectoId = await ProyectoModel.crear(req.body);
    res
      .status(201)
      .json({ message: "Proyecto creado exitosamente", id: nuevoProyectoId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el proyecto: " + error.message });
  }
}

async function obtenerProyectos(req, res) {
  try {
    const proyectos = await ProyectoModel.obtenerTodos();
    res.status(200).json(proyectos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener proyectos: " + error.message });
  }
}

async function actualizarProyecto(req, res) {
  try {
    const { id } = req.params;
    const filasActualizadas = await ProyectoModel.actualizar(id, req.body);
    if (filasActualizadas > 0) {
      res.status(200).json({ message: "Proyecto actualizado exitosamente" });
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el proyecto: " + error.message });
  }
}

async function asignarActivoAProyecto(req, res) {
  try {
    const { proyectoId, articuloId, cantidad } = req.body;
    await ProyectoModel.asignarActivo(proyectoId, articuloId, cantidad);
    res
      .status(200)
      .json({ message: "Activo asignado exitosamente al proyecto" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al asignar activo: " + error.message });
  }
}

async function eliminarActivoDeProyecto(req, res) {
  try {
    const { proyectoId, articuloId } = req.params;
    await ProyectoModel.eliminarActivo(proyectoId, articuloId);
    res
      .status(200)
      .json({ message: "Activo eliminado exitosamente del proyecto" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al eliminar activo: " + error.message });
  }
}

async function reducirCantidadActivos(req, res) {
  try {
    const { proyectoId, articuloId } = req.params;
    const cantidad = req.body.cantidad;
    console.log(
      `Reduciendo ${cantidad} del artículo ${articuloId} en proyecto ${proyectoId}`
    );
    await ProyectoModel.reducirCantidadActivos(
      proyectoId,
      articuloId,
      cantidad
    );
    res
      .status(200)
      .json({ message: "Cantidad de activos reducida exitosamente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al reducir cantidad de activos: " + error.message,
    });
  }
}

async function obtenerActivosDeProyecto(req, res) {
  try {
    const { proyectoId } = req.params;
    const activos = await ProyectoModel.obtenerActivosDeProyecto(proyectoId);
    res.status(200).json(activos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener activos: " + error.message });
  }
}

async function finalizarProyecto(req, res) {
  try {
    const { id } = req.params;
    await ProyectoModel.finalizarProyecto(id);
    res.status(200).json({
      message: "Proyecto finalizado y activos liberados exitosamente",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al finalizar el proyecto: " + error.message });
  }
}

module.exports = {
  crearProyecto,
  obtenerProyectos,
  actualizarProyecto,
  asignarActivoAProyecto,
  finalizarProyecto,
  eliminarActivoDeProyecto,
  obtenerActivosDeProyecto,
  reducirCantidadActivos,
};
