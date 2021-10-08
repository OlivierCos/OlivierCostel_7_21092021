const fs = require('fs');
const models = require('../models');
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM'); // On vérifie le token décodé avec la clé secrète (créée dans Controller/User)
  const userId = decodedToken.userId; 
  console.log(decodedToken)
    models.Comment.create({
      PostId: req.params.id,
      UserId: userId,
   comment: req.body.comment,
  })
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
        models.Comment.updateOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteComment = (req, res, next) => {
    models.Comment.destroy({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }));
  };


exports.getAllComment = (req, res, next) => { 
  models.Comment.findAll()
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error }));
  };
