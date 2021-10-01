// Fonctions qui vont s'appliquer aux différentes routes pour les sauces

const express = require('express');
const router = express.Router(); // Appel du routeur avec la méthode mise à disposition par Express
const auth = require('../middleware/auth.js'); // Middleware pour sécuriser les routes via le plugin JsonWebToken
const multer = require('../middleware/multer-config.js'); // Middleware pour la gestion des images


const postCtrl = require('../controllers/post.js'); // On associe les fonctions aux différentes routes en important le controller

router.get('/', postCtrl.getAllPost);
router.post('/', postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;
