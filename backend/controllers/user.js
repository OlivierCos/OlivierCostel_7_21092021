const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const fs = require('fs');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      let imageUrl
      if (req.body.image) {
        imageUrl = req.body.image
      } else {
        imageUrl = null
      }
   models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        image: imageUrl
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

    exports.modifyUser = async (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN); 
      const userId = decodedToken.userId;
      const user = await models.User.findOne({  where: { id: userId }});
      if (user.admin){
        req.file ? ( 
          models.User.findOne({ id: req.params.id})
            .then((user) => {
              const filename = user.image.split('/images/')[1]
              fs.unlinkSync(`images/${filename}`)})  
            .catch(error => res.status(400).json({ error })), 
          bcrypt.hash(req.body.password, 10)
          .then(hash => {
            models.User.update({  
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`},
            {where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
            .catch(error => res.status(400).json({ error }))
            })
          .catch(error => res.status(500).json({ error }))
        ) : (
          bcrypt.hash(req.body.password, 10)
          .then(hash => {
            models.User.update({  
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }, {where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
            .catch(error => res.status(400).json({ error }))
              })
          .catch(error => res.status(500).json({ error }))
        )
      }
    else {
      req.file ? ( 
        models.User.findOne({ id: userId})
          .then((user) => {
            const filename = user.image.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`)})  
          .catch(error => res.status(400).json({ error })), 
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          models.User.update({  
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }, {where: { id: userId }})
          .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
          .catch(error => res.status(400).json({ error }))
          })
        .catch(error => res.status(500).json({ error }))
      ) : (
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          models.User.update({  
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }, {where: { id: userId }})
          .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
          .catch(error => res.status(400).json({ error }))
            })
        .catch(error => res.status(500).json({ error }))
      )}
    };
    
    exports.deleteUser = async (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.userId;
      const user = await models.User.findOne({  where: { id: userId }});
  if (user.admin){
    req.file ? ( 
      models.User.findOne({ id: req.params.id})
        .then((user) => {
          const filename = user.image.split('/images/')[1]
          fs.unlinkSync(`images/${filename}`)})  
        .catch(error => res.status(400).json({ error })),
      models.Comment.destroy({ where: { UserId: req.params.id }}),
      models.Post.destroy({ where: { UserId: req.params.id }}),
      models.User.destroy({ where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch((error) => res.status(400).json({ error }))
    ) : (
      models.Comment.destroy({ where: { UserId: req.params.id }}),
      models.Post.destroy({ where: { UserId: req.params.id }}),
      models.User.destroy({ where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch((error) => res.status(400).json({ error }))
    )}
  else { 
    req.file ? (
      models.User.findOne({ id: userId})
        .then((user) => {
          const filename = user.image.split('/images/')[1]
          fs.unlinkSync(`images/${filename}`)})  
        .catch(error => res.status(400).json({ error })),
      models.User.destroy({ where: { id: userId }})
      .then(async() => { await 
        models.Comment.destroy({ where: { UserId: userId }})
        models.Post.destroy({ where: { UserId: userId }})
        res.status(200).json({ message: 'Post supprimé !'})
      })
      .catch((error) => res.status(400).json({ error }))
    ) : (
      models.User.destroy({ where: { id: userId }})
    .then(async() => { await 
      models.Comment.destroy({ where: { UserId: userId }})
      models.Post.destroy({ where: { UserId: userId }})
      res.status(200).json({ message: 'Post supprimé !'})
    })
    .catch((error) => res.status(400).json({ error }))
    )
}};


    exports.getOneUser = async(req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.userId;
      const user = await models.User.findOne({  where: { id: userId }});
      if (user.admin){ models.User.findAll({order: [[
        "createdAt", "DESC"
      ]]})
      .then(users => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
      }
      else {
    models.User.findAll({  where: { id: userId }})
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json({ error }));
    }};