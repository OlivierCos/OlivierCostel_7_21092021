const express = require('express');  // Framework basé sur Node (Express représente l'infrastructure de serveur d'applications Web)
const path = require('path'); // Pour retrouver les répertoires et chemins des fichiers images
const helmet = require('helmet'); // utilisation du module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités
const { Sequelize } = require('sequelize');
const postRoutes = require('./routes/post.js');
const userRoutes = require('./routes/user.js');
const commentRoutes = require('./routes/comment.js');


// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();

const app = express(); //  L'application utilise le framework express

app.get('/', async function (req, res) {
      const sequelize = new Sequelize('groupomania', 'root', '', {
          host: 'localhost',
          dialect: 'mysql'
  });
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

//Remplace body-parser, qui est désormais integré à express, cela permet d'extraire l'objet JSON des requêtes POST
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images'))); // Gestion de l'image de façon statique, pour que le client télécharge les images du server
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// Export de l'application express pour déclaration dans server.js
module.exports = app;
