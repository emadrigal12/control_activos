const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const loginController = require("../controllers/loginController");
const activoController = require("../controllers/activosController");
const proyectoController = require("../controllers/proyectosController");
const usuariosController = require("../controllers/usuariosController");
const validateTokenController = require("../controllers/validateTokenController");

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
router.post("/proyectos", authMiddleware, proyectoController.crearProyecto);
router.get("/proyectos", authMiddleware, proyectoController.obtenerProyectos);
router.put(
  "/proyectos/:id",
  authMiddleware,
  proyectoController.actualizarProyecto
);
router.post(
  "/proyectos/asignar-activo",
  authMiddleware,
  proyectoController.asignarActivoAProyecto
);
router.delete(
  "/proyectos/eliminar-activo/:proyectoId/:articuloId",
  authMiddleware,
  proyectoController.eliminarActivoDeProyecto
);
router.post(
  "reducir-cantidad-activos/:proyectoId/:articuloId",
  authMiddleware,
  proyectoController.reducirCantidadActivos
);
router.get(
  "/proyectos/obtener-activos/:proyectoId",
  authMiddleware,
  proyectoController.obtenerActivosDeProyecto
);
router.put(
  "/proyectos/:id/finalizar",
  authMiddleware,
  proyectoController.finalizarProyecto
);

module.exports = router;
