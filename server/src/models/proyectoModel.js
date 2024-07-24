const connection = require('../models/database');

class ProyectoModel {
  static async crear(proyectoData) {
    const query = 'INSERT INTO PROYECTO (Descripcion, Fecha_Inicio, Fecha_Fin, Estado) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute(query, [
      proyectoData.Descripcion,
      proyectoData.Fecha_Inicio,
      proyectoData.Fecha_Fin,
      proyectoData.Estado
    ]);
    return result.insertId;
  }

  static async obtenerTodos() {
    const query = 'SELECT * FROM PROYECTO';
    const [rows] = await connection.execute(query);
    return rows;
  }

  static async obtenerPorId(id) {
    const query = 'SELECT * FROM PROYECTO WHERE Id = ?';
    const [rows] = await connection.execute(query, [id]);
    return rows[0];
  }

  static async actualizar(id, proyectoData) {
    const query = 'UPDATE PROYECTO SET Descripcion = ?, Fecha_Inicio = ?, Fecha_Fin = ?, Estado = ? WHERE Id = ?';
    const [result] = await connection.execute(query, [
      proyectoData.Descripcion,
      proyectoData.Fecha_Inicio,
      proyectoData.Fecha_Fin,
      proyectoData.Estado,
      id
    ]);
    return result.affectedRows;
  }

  static async asignarActivo(proyectoId, articuloId, cantidad) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Verificar disponibilidad del activo
      const [inventario] = await conn.execute('SELECT Cantidad_Disponible FROM INVENTARIO WHERE IdArticulo = ?', [articuloId]);
      if (inventario[0].Cantidad_Disponible < cantidad) {
        throw new Error('No hay suficientes activos disponibles');
      }

      // Actualizar inventario
      await conn.execute('UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible - ?, Cantidad_Proyecto = Cantidad_Proyecto + ? WHERE IdArticulo = ?', [cantidad, cantidad, articuloId]);

      // Registrar asignación en ARTICULO_PROYECTO
      await conn.execute('INSERT INTO ARTICULO_PROYECTO (Id_Proyecto, Id_Articulo, Cantidad) VALUES (?, ?, ?)', [proyectoId, articuloId, cantidad]);

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async finalizarProyecto(id) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Actualizar estado del proyecto
      await conn.execute('UPDATE PROYECTO SET Estado = ? WHERE Id = ?', [2, id]);

      // Liberar activos asignados
      const [asignaciones] = await conn.execute('SELECT Id_Articulo, Cantidad FROM ARTICULO_PROYECTO WHERE Id_Proyecto = ?', [id]);
      for (const asignacion of asignaciones) {
        await conn.execute('UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible + ?, Cantidad_Proyecto = Cantidad_Proyecto - ? WHERE IdArticulo = ?', [asignacion.Cantidad, asignacion.Cantidad, asignacion.Id_Articulo]);
      }

      // Eliminar registros de ARTICULO_PROYECTO
      await conn.execute('DELETE FROM ARTICULO_PROYECTO WHERE Id_Proyecto = ?', [id]);

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = ProyectoModel;