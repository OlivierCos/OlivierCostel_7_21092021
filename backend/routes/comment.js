
const express = require('express');
const router = express.Router(); // Appel du routeur avec la méthode mise à disposition par Express
const auth = require('../middleware/auth.js'); // Middleware pour sécuriser les routes via le plugin JsonWebToken

const commentCtrl = require('../controllers/comment.js'); // On associe les fonctions aux différentes routes en important le controller

router.get('/', commentCtrl.getAllComment);
router.post('/', commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
