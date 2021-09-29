// Fonctions qui vont s'appliquer aux différentes routes pour les users
const express = require('express');
const router = express.Router();
const passwordAuth = require('../middleware/passwordauth');

const userCtrl = require('../controllers/user.js');

router.post('/signup', passwordAuth, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;