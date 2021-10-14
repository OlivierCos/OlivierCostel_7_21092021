const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');



exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
   models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        image:req.body.image
      })
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(403).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  models.User.findOne({ where: { email: req.body.email } })
          .then(user => {
            if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                  userId: user.id,
                  userAdmin: user.admin,
                  token: jwt.sign(
                    { userId: user.id },
                    process.env.TOKEN,
                    { expiresIn: '24h' }
                  )
                });
              })
              .catch(error => res.status(500).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
    };

    exports.modifyUser = (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN); // On vérifie le token décodé avec la clé secrète (créée dans Controller/User)
      const userId = decodedToken.userId;
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        models.User.update({  
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        image:req.body.image
        }, {where: { id: userId }})
      
            .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
            .catch(error => res.status(400).json({ error }))
          })
          .catch(error => res.status(500).json({ error }));
    }
    
    exports.deleteUser = (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN); // On vérifie le token décodé avec la clé secrète (créée dans Controller/User)
      const userId = decodedToken.userId;
      models.Comment.destroy({ where: { UserId: req.params.id }})
      models.Post.destroy({ where: { UserId: req.params.id }})
      models.User.destroy({ where: { 
        id: userId
      }})
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch((error) => res.status(400).json({ error }));
    };

    exports.getAllUser = (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN); // On vérifie le token décodé avec la clé secrète (créée dans Controller/User)
      const userId = decodedToken.userId;
      models.User.findAll({  where: { id: userId }
    })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json({ error }));
    };