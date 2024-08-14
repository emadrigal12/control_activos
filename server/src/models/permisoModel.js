
const connection = require('../config/database');

class RolModel {
  static async obtenerRolPorId(id) {
    const [rows] = await connection.execute('SELECT * FROM ROLES WHERE Id = ?', [id]);
    return rows[0];
  }

  static async obtenerPermisosPorRol(rolId) {
    const [rows] = await connection.execute(
      'SELECT p.Nombre FROM Permisos p JOIN ROLES_PERMISOS rp ON p.Id = rp.Permiso_Id WHERE rp.Rol_Id = ?',
      [rolId]
    );
    return rows.map(row => row.nombre);
  }
}

module.exports = RolModel;