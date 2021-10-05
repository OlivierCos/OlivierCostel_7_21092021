const models = require('../models');

exports.createComment = (req, res, next) => {
    models.Comment.create({
    // idUSERS: req.body.UserId,
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
    models.Comment.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }));
  };


exports.getAllComment = (req, res, next) => {
    models.Comment.findAll()
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error }));
  };
