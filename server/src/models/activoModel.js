const connection = require("./database");

class ArticuloModel {
  static async obtenerTodos() {
    const query = `
      SELECT a.*, u.Nombre AS Responsable, u.Apellido AS Responsable_Apellido, i.Cantidad_Total, i.Cantidad_Proyecto, i.Cantidad_Disponible
      FROM ARTICULO a
      LEFT JOIN USUARIO u ON a.Id_Usuario = u.Id_Usuario  -- Lo uni con la tabla de USUARIO para obtener el nombre del responsable
      LEFT JOIN INVENTARIO i ON a.Id = i.IdArticulo
    `;

    const [rows] = await connection.execute(query);
    return rows;
  }

  static async crear(articuloData) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Insertar el nuevo artículo
      const [resultArticulo] = await conn.execute(
        `INSERT INTO ARTICULO (Descripcion, Ubicacion, Activo_Num, Tipo, Marca, Modelo, Id_Usuario, En_Uso, Depreciado) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          articuloData.Descripcion,
          articuloData.Ubicacion,
          articuloData.Activo_Num,
          articuloData.Tipo,
          articuloData.Marca,
          articuloData.Modelo,
          articuloData.Id_Usuario,
          articuloData.En_Uso,
          articuloData.Depreciado,
        ]
      );
      const nuevoArticuloId = resultArticulo.insertId;

      // Inicializar el inventario para el nuevo artículo
      await conn.execute(
        `INSERT INTO INVENTARIO (IdArticulo, Cantidad_Total, Cantidad_Proyecto, Cantidad_Disponible) 
         VALUES (?, 0, 0, 0)`,
        [nuevoArticuloId]
      );

      await conn.commit();
      return nuevoArticuloId;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async actualizar(id, articuloData) {
    const query = `
      UPDATE ARTICULO 
      SET 
        Descripcion = ?, 
        Ubicacion = ?, 
        Activo_Num = ?, 
        Tipo = ?, 
        Marca = ?, 
        Modelo = ?, 
        Id_Usuario = ?, 
        En_Uso = ?, 
        Depreciado = ? 
      WHERE Id = ?
    `;
    const values = [
      articuloData.Descripcion,
      articuloData.Ubicacion,
      articuloData.Activo_Num,
      articuloData.Tipo,
      articuloData.Marca,
      articuloData.Modelo,
      articuloData.Id_Usuario,
      articuloData.En_Uso,
      articuloData.Depreciado,
      id,
    ];
    const [result] = await connection.execute(query, values);
    return result.affectedRows;
  }

  static async obtenerPorId(id) {
    const query = `
      SELECT a.*, i.Cantidad_Total, i.Cantidad_Proyecto, i.Cantidad_Disponible
      FROM ARTICULO a
      LEFT JOIN INVENTARIO i ON a.Id = i.IdArticulo
      WHERE a.Id = ?
    `;
    const [rows] = await connection.execute(query, [id]);
    return rows[0];
  }

  static async eliminar(id) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // Eliminar el registro de inventario asociado
      await conn.execute("DELETE FROM INVENTARIO WHERE IdArticulo = ?", [id]);

      // Eliminar el artículo
      const [result] = await conn.execute("DELETE FROM ARTICULO WHERE Id = ?", [
        id,
      ]);

      await conn.commit();
      return result.affectedRows;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = ArticuloModel;
