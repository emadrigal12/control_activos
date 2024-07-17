const connection = require('./database');

class ArticuloModel {
  static async obtenerTodos() {
    const query = `
      SELECT a.*, c.Descripcion AS Categoria, i.Cantidad_Total, i.Cantidad_Proyecto, i.Cantidad_Disponible
      FROM ARTICULO a
      LEFT JOIN CATEGORIA c ON a.Id_Categoria = c.Id
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
        'INSERT INTO ARTICULO (Descripcion, Id_Categoria) VALUES (?, ?)',
        [articuloData.Descripcion, articuloData.Id_Categoria]
      );
      const nuevoArticuloId = resultArticulo.insertId;

      // Inicializar el inventario para el nuevo artículo
      await conn.execute(
        'INSERT INTO INVENTARIO (IdArticulo, Cantidad_Total, Cantidad_Proyecto, Cantidad_Disponible) VALUES (?, 0, 0, 0)',
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
      SET Descripcion = ?, Id_Categoria = ? 
      WHERE Id = ?
    `;
    const values = [articuloData.Descripcion, articuloData.Id_Categoria, id];
    const [result] = await connection.execute(query, values);
    return result.affectedRows;
  }

  static async obtenerPorId(id) {
    const query = `
      SELECT a.*, c.Descripcion AS Categoria, i.Cantidad_Total, i.Cantidad_Proyecto, i.Cantidad_Disponible
      FROM ARTICULO a
      LEFT JOIN CATEGORIA c ON a.Id_Categoria = c.Id
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
      await conn.execute('DELETE FROM INVENTARIO WHERE IdArticulo = ?', [id]);

      // Eliminar el artículo
      const [result] = await conn.execute('DELETE FROM ARTICULO WHERE Id = ?', [id]);

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