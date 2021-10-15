const express = require('express');
const router = express.Router(); 
const auth = require('../middleware/auth.js'); 
const commentCtrl = require('../controllers/comment.js'); 

router.get('/', auth, commentCtrl.getAllComment);
router.post('/:id', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
