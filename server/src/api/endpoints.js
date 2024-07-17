const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.post('/login', loginController.login);

// Rutas protegidas
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Perfil del usuario', user: req.user });
});

module.exports = router;