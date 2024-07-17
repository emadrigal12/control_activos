const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const loginController = require('../controllers/loginController');
const activoController = require('../controllers/activosController');

router.post('/login', loginController.login);

// Rutas protegidas

//Menu principal
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Perfil del usuario', user: req.user });
});

//Activos
router.get('/articulos', authMiddleware, activoController.obtenerArticulos);
router.get('/articulos/:id', authMiddleware, activoController.obtenerArticuloPorId);
router.post('/articulos', authMiddleware, activoController.crearArticulo);
router.put('/articulos/:id', authMiddleware, activoController.actualizarArticulo);
router.delete('/articulos/:id', authMiddleware, activoController.eliminarArticulo);


//Perfil


//Proyectos

module.exports = router;