const express = require('express');
const router = express.Router(); 
const auth = require('../middleware/auth.js'); 
const postCtrl = require('../controllers/post.js'); 

router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;
