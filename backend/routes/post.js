const express = require('express');
const router = express.Router(); // Appel du routeur avec la méthode mise à disposition par Express
const auth = require('../middleware/auth.js'); // Middleware pour sécuriser les routes via le plugin JsonWebToken
const postCtrl = require('../controllers/post.js'); // On associe les fonctions aux différentes routes en important le controller

router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;
