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

  static async crearUsuario(userData) {
    try {
      const query = `
        INSERT INTO USUARIO (Username, Password, Nombre, Apellido, Rol_Id, Estado)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connection.execute(query, [
        userData.Username,
        userData.Password,
        userData.Nombre,
        userData.Apellido,
        userData.Rol_Id,
        userData.Estado
      ]);

      return { Id_Usuario: result.insertId, ...userData };
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  static async cambiarEstadoUsuario(id, estado) {
    try {
      const query = `
        UPDATE USUARIO
        SET Estado = ?
        WHERE Id_Usuario = ?
      `;

      await connection.execute(query, [estado, id]);
    } catch (error) {
      throw new Error(`Error al cambiar el estado del usuario: ${error.message}`);
    }
  }
}

module.exports = UsuarioModel;