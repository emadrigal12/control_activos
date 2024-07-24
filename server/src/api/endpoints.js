const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const loginController = require("../controllers/loginController");
const activoController = require("../controllers/activosController");
const proyectoController = require('../controllers/proyectosController');
const usuariosController = require("../controllers/usuariosController");
const validateTokenController = require("../controllers/validateTokenController");
const reporteController = require('../controllers/reportesController');


// Hacer login
router.post("/login", loginController.login);

// Validación de token
router.post("/validateToken", validateTokenController.validateToken); // Agrega el nuevo endpoint

// Rutas protegidas

//Menu principal
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Perfil del usuario", user: req.user });
});

//Activos
router.get("/articulos", authMiddleware, activoController.obtenerArticulos);
router.get(
  "/articulos/:id",
  authMiddleware,
  activoController.obtenerArticuloPorId
);
router.post("/articulos", authMiddleware, activoController.crearArticulo);
router.put(
  "/articulos/:id",
  authMiddleware,
  activoController.actualizarArticulo
);
router.delete(
  "/articulos/:id",
  authMiddleware,
  activoController.eliminarArticulo
);


//Perfil
router.get(
  "/usuario/:id",
  authMiddleware,
  usuariosController.obtenerUsuarioPorId
);

//Proyectos
router.post('/proyectos', authMiddleware, proyectoController.crearProyecto);
router.get('/proyectos', authMiddleware, proyectoController.obtenerProyectos);
router.put('/proyectos/:id', authMiddleware, proyectoController.actualizarProyecto);
router.post('/proyectos/asignar-activo', authMiddleware, proyectoController.asignarActivoAProyecto);
router.put('/proyectos/:id/finalizar', authMiddleware, proyectoController.finalizarProyecto);


//Reportes
router.get('/reportes/estado-proyectos-activos', authMiddleware, reporteController.obtenerReporteEstadoProyectosYActivos);
router.get('/reportes/utilizacion-activos', authMiddleware, reporteController.obtenerReporteUtilizacionActivos);
router.get('/reportes/estado-proyectos-activos/excel', authMiddleware, reporteController.exportarReporteExcel);
router.get('/reportes/estado-proyectos-activos/pdf', authMiddleware, reporteController.exportarReportePDF);


module.exports = router;
