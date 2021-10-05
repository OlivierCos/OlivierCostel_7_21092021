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
                  token: jwt.sign(
                    { userId: user.id },
                    'RANDOM',
                    { expiresIn: '24h' }
                  )
                });
              })
              .catch(error => res.status(500).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
    };