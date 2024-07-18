const connection = require("./database");

class UsuarioModel {
  static async obtenerUsuarioPorId(id) {
    try {
      const query = `
        SELECT * FROM USUARIO
        WHERE Id_Usuario = ?
      `;

      const [rows] = await connection.execute(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(
        `Error en la consulta de obtenerUsuarioPorId: ${error.message}`
      );
    }
  }
}

module.exports = UsuarioModel;
