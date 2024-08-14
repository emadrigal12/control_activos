
const connection = require('../models/database');

const verificarPermiso = (permisoRequerido) => {
  return async (req, res, next) => {
    try {
      const rolId = req.user.rol_id;
      const [permisos] = await connection.execute(
        'SELECT P.Nombre FROM PERMISOS P ' +
        'JOIN ROLES_PERMISOS RP ON P.Id = RP.Permiso_Id ' +
        'WHERE RP.Rol_Id = ?',
        [rolId]
      );
      
      if (permisos.some(p => p.Nombre === permisoRequerido)) {
        next();
      } else {
        res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al verificar permisos' });
    }
  };
};

module.exports = verificarPermiso;