const express = require('express');
const multer = require('../middleware/multer-config.js');
const auth = require('../middleware/auth.js'); 
const router = express.Router();
const userCtrl = require('../controllers/user.js');

router.get('/', auth, userCtrl.getOneUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
