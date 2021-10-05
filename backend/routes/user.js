// Fonctions qui vont s'appliquer aux différentes routes pour les users
const express = require('express');
const router = express.Router();

// const passwordAuth = require('../middleware/passwordauth');

const userCtrl = require('../controllers/user.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

// const express      = require('express');
// const usersCtrl    = require('./routes/user');
// const postCtrl     = require('./routes/post');
// const likesCtrl    = require('./routes/likesCtrl');
// const sequelize = new Sequelize("groupomanoa", "root", "", {
//   dialect: "mysql",
//   host: "localhost"
// });
// try {
//  await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// Router
// exports.router = (function() {
//   const apiRouter = express.Router();

//   // Users routes
//   apiRouter.post('/users/signup/', usersCtrl.signup);
//   apiRouter.post('/users/login/', usersCtrl.login);
//   apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
//   apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);

  // posts routes
//   apiRouter.route('/posts/new/').post(postCtrl.createPost);
//   apiRouter.route('/posts/').get(postCtrl.getAllPosts);

//   // Likes
//   apiRouter.route('/posts/:postId/vote/like').post(likesCtrl.likePost);
//   apiRouter.route('/posts/:postId/vote/dislike').post(likesCtrl.dislikePost);

//   return apiRouter;
// })();