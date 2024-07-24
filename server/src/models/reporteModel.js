const connection = require('../models/database');

class ReporteModel {
  static async obtenerEstadoProyectosYActivos() {
    const query = `
      SELECT 
        p.Id AS ProyectoId,
        p.Descripcion AS ProyectoNombre,
        p.Fecha_Inicio,
        p.Fecha_Fin,
        pe.Descripcion AS EstadoProyecto,
        COUNT(DISTINCT ap.Id_Articulo) AS NumeroDeActivosAsignados,
        SUM(ap.Cantidad) AS CantidadTotalActivosAsignados,
        GROUP_CONCAT(DISTINCT CONCAT(a.Descripcion, ' (', ap.Cantidad, ')') SEPARATOR ', ') AS DetalleActivos,
        (SELECT SUM(Cantidad_Total) FROM INVENTARIO) AS TotalActivosInventario,
        (SELECT SUM(Cantidad_Disponible) FROM INVENTARIO) AS TotalActivosDisponibles
      FROM PROYECTO p
      LEFT JOIN PROYECTO_ESTADO pe ON p.Estado = pe.Id
      LEFT JOIN ARTICULO_PROYECTO ap ON p.Id = ap.Id_Proyecto
      LEFT JOIN ARTICULO a ON ap.Id_Articulo = a.Id
      GROUP BY p.Id
      ORDER BY p.Fecha_Inicio DESC
    `;

    const [rows] = await connection.execute(query);
    return rows;
  }

  static async obtenerUtilizacionActivos() {
    const query = `
      SELECT 
        a.Id AS ArticuloId,
        a.Descripcion AS ArticuloNombre,
        i.Cantidad_Total,
        i.Cantidad_Proyecto,
        i.Cantidad_Disponible,
        (i.Cantidad_Proyecto / i.Cantidad_Total * 100) AS PorcentajeUtilizacion,
        GROUP_CONCAT(DISTINCT CONCAT(p.Descripcion, ' (', ap.Cantidad, ')') SEPARATOR ', ') AS ProyectosAsignados
      FROM ARTICULO a
      JOIN INVENTARIO i ON a.Id = i.IdArticulo
      LEFT JOIN ARTICULO_PROYECTO ap ON a.Id = ap.Id_Articulo
      LEFT JOIN PROYECTO p ON ap.Id_Proyecto = p.Id
      GROUP BY a.Id
      ORDER BY PorcentajeUtilizacion DESC
    `;

    const [rows] = await connection.execute(query);
    return rows;
  }
}

module.exports = ReporteModel;