const express = require('express'); 
const path = require('path');
const helmet = require('helmet'); // utilisation du module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités
const { Sequelize } = require('sequelize');
const postRoutes = require('./routes/post.js');
const userRoutes = require('./routes/user.js');
const commentRoutes = require('./routes/comment.js');

require('dotenv').config();

const app = express();

app.get('/', async function (req, res) {
      const sequelize = new Sequelize(proces.env.SEQUELIZEDB);
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('Ca marche');
  });

// Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout utilisateur puisse faire des requétes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');// Les ressources peuvent être partagées à tous
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Entêtes utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Méthodes autorisées pour les requêtes HTTP
    next();
  });

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images'))); 
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// Export de l'application express pour déclaration dans server.js
module.exports = app;
