const connection = require('./database');

class ActivoModel {
  static async obtenerTodos() {
    const query = 'SELECT * FROM ARTICULO';
    try {
      const [rows] = await connection.execute(query);
      return rows;
    } catch (error) {
      throw new Error('Error al obtener activos: ' + error.message);
    }
  }
}

module.exports = ActivoModel;