const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const loginController = require("../controllers/loginController");
const activoController = require("../controllers/activosController");
const proyectoController = require("../controllers/proyectosController");
const usuariosController = require("../controllers/usuariosController");
const validateTokenController = require("../controllers/validateTokenController");
const reporteController = require("../controllers/reportesController");
const verificarPermiso = require("../middleware/verificarPermiso");

// Hacer login
router.post("/login", loginController.login);

// Validación de token
router.post("/validateToken", validateTokenController.validateToken); // Agrega el nuevo endpoint

// Rutas protegidas

//Menu principal
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Ver_Perfil_Usuario", user: req.user });
});

//Activos
router.get(
  "/articulos",
  authMiddleware,
  verificarPermiso("Consultar_Activo"),
  activoController.obtenerArticulos
);
router.get(
  "/articulos/:id",
  authMiddleware,
  verificarPermiso("Consultar_Activo"),
  activoController.obtenerArticuloPorId
);
router.post(
  "/articulos",
  authMiddleware,
  verificarPermiso("Crear_Activo"),
  activoController.crearArticulo
);
router.put(
  "/articulos/:id",
  authMiddleware,
  verificarPermiso("Editar_Activo"),
  activoController.actualizarArticulo
);
router.delete(
  "/articulos/:id",
  authMiddleware,
  verificarPermiso("Eliminar activo"),
  activoController.eliminarArticulo
);

//Perfil
router.get(
  "/usuario/:id",
  authMiddleware,
  verificarPermiso("Ver_Perfil_Usuario"),
  usuariosController.obtenerUsuarioPorId
);

//Proyectos
router.post(
  "/proyectos",
  authMiddleware,
  verificarPermiso("Crear_Proyecto"),
  proyectoController.crearProyecto
);
router.get(
  "/proyectos",
  authMiddleware,
  verificarPermiso("Consultar_Proyecto"),
  proyectoController.obtenerProyectos
);
router.get(
  "/proyecto/:id",
  authMiddleware,
  verificarPermiso("Consultar_Proyecto"),
  proyectoController.obtenerProyectoPorId
);
router.put(
  "/proyectos/:id",
  authMiddleware,
  verificarPermiso("Editar_Proyecto"),
  proyectoController.actualizarProyecto
);
router.post(
  "/proyectos/asignar-activo",
  authMiddleware,
  //verificarPermiso("Gestionar_Proyectos"), Por el momento no permite asignar activos a pesar de tener el permiso
  proyectoController.asignarActivoAProyecto
);
router.delete(
  "/proyectos/eliminar-activo/:proyectoId/:articuloId",
  authMiddleware,
  verificarPermiso("Eliminar_Proyecto"),
  proyectoController.eliminarActivoDeProyecto
);
router.post(
  "/reducir-cantidad-activos/:proyectoId/:articuloId",
  authMiddleware,
  verificarPermiso("Reducir_Cantidad_Activos"),
  proyectoController.reducirCantidadActivos
);
router.get(
  "/proyectos/obtener-activos/:proyectoId",
  authMiddleware,
  verificarPermiso("Ver_Activos_Proyecto"),
  proyectoController.obtenerActivosDeProyecto
);
router.put(
  "/proyectos/:id/finalizar",
  authMiddleware,
  verificarPermiso("Finalizar_Proyecto"),
  proyectoController.finalizarProyecto
);

//Reportes
router.get(
  "/reportes/estado-proyectos-activos",
  authMiddleware,
  verificarPermiso("Generar_Reportes"),
  reporteController.obtenerReporteEstadoProyectosYActivos
);
router.get(
  "/reportes/utilizacion-activos",
  authMiddleware,
  verificarPermiso("Generar_Reportes"),
  reporteController.obtenerReporteUtilizacionActivos
);
router.get(
  "/reportes/estado-proyectos-activos/excel",
  authMiddleware,
  verificarPermiso("Generar_Reportes"),
  reporteController.exportarReporteExcel
);
router.get(
  "/reportes/estado-proyectos-activos/pdf",
  authMiddleware,
  verificarPermiso("Generar_Reportes"),
  reporteController.exportarReportePDF
);

module.exports = router;
