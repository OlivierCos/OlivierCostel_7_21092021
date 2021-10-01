// const express = require('express');
// const { Sequelize } = require('sequelize');
// const apiRouter = require('./apiRouter');

// //Instantiate server
// const server = express();

// server.use(express.urlencoded({extended: true})); 
// server.use(express.json());

// server.use((req, res, next) => {
//       res.setHeader('Access-Control-Allow-Origin', '*');// Les ressources peuvent être partagées à tous
//       res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Entêtes utilisées après la pré-vérification cross-origin afin de donner l'autorisation
//       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Méthodes autorisées pour les requêtes HTTP
//       next();
//     });

// //Configure routes 
// server.get('/', async function (req, res) {
//     const sequelize = new Sequelize('groupomania', 'root', '', {
//         host: 'localhost',
//         dialect: 'mysql'
// });
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// res.setHeader('Content-Type', 'text/html');
// res.status(200).send('Ca marche');
// });

// server.use('/api/', apiRouter);

// //Launch server
// server.listen(3000, function() {
//     console.log('Server en écoute')
// });

const http = require('http'); // Import du package pour l'écoute des requêtes http
const app = require('./app'); // Import du fichier app.js pour utiliser l'application sur le serveur

// normalizePort : Pour renvoyer un port valide, sous forme d'un numéro ou d'une chaîne 
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// errorHandler : Pour rechercher et gérer les différentes erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Créer un serveur via express en utilisant app
// création d'une constante pour les appels serveur (requêtes et réponses)
const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
