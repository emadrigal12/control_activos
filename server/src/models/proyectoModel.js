const connection = require("../models/database");

class ProyectoModel {
  static async crear(proyectoData) {
    const query =
      "INSERT INTO PROYECTO (Descripcion, Fecha_Inicio, Fecha_Fin, Estado) VALUES (?, ?, ?, ?)";
    const [result] = await connection.execute(query, [
      proyectoData.Descripcion,
      proyectoData.Fecha_Inicio,
      proyectoData.Fecha_Fin,
      proyectoData.Estado,
    ]);
    return result.insertId;
  }

  static async obtenerTodos() {
    const query = "SELECT * FROM PROYECTO";
    const [rows] = await connection.execute(query);
    // Modificar las fechas para que solo devuelvan la parte de la fecha
    rows.forEach((row) => {
      row.Fecha_Inicio = row.Fecha_Inicio.toISOString().split("T")[0];
      row.Fecha_Fin = row.Fecha_Fin.toISOString().split("T")[0];
    });
    return rows;
  }

  static async obtenerProyectoPorId(id) {
    const query = "SELECT * FROM PROYECTO WHERE Id = ?";
    const [rows] = await connection.execute(query, [id]);
    // Modificar las fechas para que solo devuelvan la parte de la fecha
    if (rows.length > 0) {
      const proyecto = rows[0];
      proyecto.Fecha_Inicio = proyecto.Fecha_Inicio.toISOString().split("T")[0];
      proyecto.Fecha_Fin = proyecto.Fecha_Fin.toISOString().split("T")[0];
      return proyecto;
    } else {
      return null; // O lanza un error si prefieres manejarlo de otra forma
    }
  }

  static async obtenerPorId(id) {
    const query = "SELECT * FROM PROYECTO WHERE Id = ?";
    const [rows] = await connection.execute(query, [id]);
    return rows[0];
  }

  static async actualizar(id, proyectoData) {
    const query =
      "UPDATE PROYECTO SET Descripcion = ?, Fecha_Inicio = ?, Fecha_Fin = ?, Estado = ? WHERE Id = ?";
    const [result] = await connection.execute(query, [
      proyectoData.Descripcion,
      proyectoData.Fecha_Inicio,
      proyectoData.Fecha_Fin,
      proyectoData.Estado,
      id,
    ]);
    return result.affectedRows;
  }

  static async asignarActivo(proyectoId, articuloId, cantidad) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Verificar disponibilidad del activo
      const [inventario] = await conn.execute(
        "SELECT Cantidad_Disponible FROM INVENTARIO WHERE IdArticulo = ?",
        [articuloId]
      );
      if (inventario[0].Cantidad_Disponible < cantidad) {
        throw new Error("No hay suficientes activos disponibles");
      }

      // Actualizar inventario
      await conn.execute(
        "UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible - ?, Cantidad_Proyecto = Cantidad_Proyecto + ? WHERE IdArticulo = ?",
        [cantidad, cantidad, articuloId]
      );

      // Registrar asignación en ARTICULO_PROYECTO
      await conn.execute(
        "INSERT INTO ARTICULO_PROYECTO (Id_Proyecto, Id_Articulo, Cantidad) VALUES (?, ?, ?)",
        [proyectoId, articuloId, cantidad]
      );

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async eliminarActivo(proyectoId, articuloId) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Obtener cantidad asignada
      const [asignacion] = await conn.execute(
        "SELECT Cantidad FROM ARTICULO_PROYECTO WHERE Id_Proyecto = ? AND Id_Articulo = ?",
        [proyectoId, articuloId]
      );
      if (asignacion.length === 0) {
        throw new Error("Activo no asignado al proyecto");
      }

      // Actualizar inventario
      await conn.execute(
        "UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible + ?, Cantidad_Proyecto = Cantidad_Proyecto - ? WHERE IdArticulo = ?",
        [asignacion[0].Cantidad, asignacion[0].Cantidad, articuloId]
      );

      // Eliminar asignación
      await conn.execute(
        "DELETE FROM ARTICULO_PROYECTO WHERE Id_Proyecto = ? AND Id_Articulo = ?",
        [proyectoId, articuloId]
      );

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async reducirCantidadActivos(proyectoId, articuloId, nuevaCantidad) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Obtener cantidad asignada actual
      const [asignacion] = await conn.execute(
        "SELECT Cantidad FROM ARTICULO_PROYECTO WHERE Id_Proyecto = ? AND Id_Articulo = ?",
        [proyectoId, articuloId]
      );
      const cantidadActual = asignacion.length > 0 ? asignacion[0].Cantidad : 0;

      // Validar que la nueva cantidad no sea negativa
      if (nuevaCantidad < 0) {
        throw new Error("La nueva cantidad no puede ser negativa");
      }

      // Obtener cantidad disponible actual
      const [inventario] = await conn.execute(
        "SELECT Cantidad_Disponible FROM INVENTARIO WHERE IdArticulo = ?",
        [articuloId]
      );
      const cantidadDisponible =
        inventario.length > 0 ? inventario[0].Cantidad_Disponible : 0;

      // Calcular la diferencia entre la nueva cantidad y la cantidad actual
      const diferencia = nuevaCantidad - cantidadActual;

      if (nuevaCantidad === 0) {
        // Si la nueva cantidad es 0, ajustar la cantidad en el inventario y el proyecto
        await conn.execute(
          "UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible + ? WHERE IdArticulo = ?",
          [cantidadActual, articuloId]
        );
        await conn.execute(
          "UPDATE ARTICULO_PROYECTO SET Cantidad = ? WHERE Id_Proyecto = ? AND Id_Articulo = ?",
          [nuevaCantidad, proyectoId, articuloId]
        );
      } else if (cantidadActual === 0 && nuevaCantidad > 0) {
        // Si la cantidad actual es 0 y la nueva cantidad es mayor que 0
        if (nuevaCantidad > cantidadDisponible) {
          throw new Error("La cantidad deseada supera la cantidad disponible");
        }
        await conn.execute(
          "UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible - ?, Cantidad_Proyecto = Cantidad_Proyecto + ? WHERE IdArticulo = ?",
          [nuevaCantidad, nuevaCantidad, articuloId]
        );
      } else if (diferencia > 0) {
        // Si la nueva cantidad es mayor que la cantidad actual
        if (diferencia > cantidadDisponible) {
          throw new Error("La cantidad deseada supera la cantidad disponible");
        }
        await conn.execute(
          "UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible - ?, Cantidad_Proyecto = Cantidad_Proyecto + ? WHERE IdArticulo = ?",
          [diferencia, diferencia, articuloId]
        );
      } else if (diferencia < 0) {
        // Si la nueva cantidad es menor que la cantidad actual
        await conn.execute(
          "UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible + ?, Cantidad_Proyecto = Cantidad_Proyecto - ? WHERE IdArticulo = ?",
          [-diferencia, -diferencia, articuloId]
        );
      }

      // Actualizar cantidad asignada en ARTICULO_PROYECTO
      await conn.execute(
        "UPDATE ARTICULO_PROYECTO SET Cantidad = ? WHERE Id_Proyecto = ? AND Id_Articulo = ?",
        [nuevaCantidad, proyectoId, articuloId]
      );

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async obtenerActivosDeProyecto(proyectoId) {
    const query =
      "SELECT A.*, AP.Cantidad FROM ARTICULO A JOIN ARTICULO_PROYECTO AP ON A.Id = AP.Id_Articulo WHERE AP.Id_Proyecto = ?";
    const [rows] = await connection.execute(query, [proyectoId]);
    return rows;
  }

  static async finalizarProyecto(id) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Actualizar estado del proyecto
      await conn.execute("UPDATE PROYECTO SET Estado = ? WHERE Id = ?", [
        2,
        id,
      ]);

      // Liberar activos asignados
      const [asignaciones] = await conn.execute(
        "SELECT Id_Articulo, Cantidad FROM ARTICULO_PROYECTO WHERE Id_Proyecto = ?",
        [id]
      );
      for (const asignacion of asignaciones) {
        await conn.execute(
          "UPDATE INVENTARIO SET Cantidad_Disponible = Cantidad_Disponible + ?, Cantidad_Proyecto = Cantidad_Proyecto - ? WHERE IdArticulo = ?",
          [asignacion.Cantidad, asignacion.Cantidad, asignacion.Id_Articulo]
        );
      }

      // Eliminar registros de ARTICULO_PROYECTO
      await conn.execute(
        "DELETE FROM ARTICULO_PROYECTO WHERE Id_Proyecto = ?",
        [id]
      );

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }


  static async cancelarProyecto(id) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Actualizar estado del proyecto
      await conn.execute("UPDATE PROYECTO SET Estado = ? WHERE Id = ?", [
        3,
        id,
      ]);

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
