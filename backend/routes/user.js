const express = require('express');
const multer = require('../middleware/multer-config.js'); // Middleware pour la gestion des images
const auth = require('../middleware/auth.js'); // Middleware pour sécuriser les routes via le plugin JsonWebToken
const router = express.Router();
const userCtrl = require('../controllers/user.js');

router.get('/', auth, userCtrl.getOneUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
