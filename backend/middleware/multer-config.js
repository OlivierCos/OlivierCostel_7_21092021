const multer = require('multer'); // Multer permet de gérer les fichiers entrants dans les requêtes HTTP

// On crée our définire le format des images
const MIME_TYPES = {
  'image/gif': 'gif',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

// On crée un objet de configuration pour préciser à multer où enregistrer les fichiers images et les renommer
const storage = multer.diskStorage({ 
  destination: (req, file, callback) => {   // Destination d'enregistrement des images dans le dossier images créer dans le backend
    callback(null, 'images');
  },
  filename: (req, file, callback) => {   // Création des noms de fichier image pour éviter les doublons
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Export du module, avec l'objet storage et la méthode single pour dire que c'est un fichier unique en précisant que c'est une image
module.exports = multer({storage: storage}).single('image'); 