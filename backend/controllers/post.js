const fs = require('fs');
const models = require('../models');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM'); // On vérifie le token décodé avec la clé secrète (créée dans Controller/User)
  const userId = decodedToken.userId;
      models.Post.create({
      UserId : userId,
      title: req.body.title,
      gif: req.body.gif,
      description: req.body.description,
    })
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    let postObject = {};
    req.file ? ( // Opérateur ternaire équivalent à if() do() else() => condition ? Instruction si vrai : Instruction si faux 
        Post.findOne({ _id: req.params.id})
          .then((post) => {
            const filename = post.imageUrl.split('/images/')[1] // On supprime l'ancienne image du serveur
            fs.unlinkSync(`images/${filename}`)})  
          .catch(error => res.status(400).json({ error })),     
        postObject = { // On modifie les données et on ajoute la nouvelle image
          ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,         
        }
    ) : (
      postObject = {...req.body}
      )// Si la modification ne contient pas de nouvelle image
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM'); // On vérifie le token décodé avec la clé secrète (créée dans Controller/User)
  const userId = decodedToken.userId;
  models.Comment.destroy({ where: { PostId: req.params.id }})
  models.Post.destroy({ where: { 
    id: req.params.id,
    UserId: userId }})
  .then(() => res.status(200).json({ message: 'Post supprimé !'}))
  .catch((error) => res.status(400).json({ error }));
};
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
      .then(post => res.status(200).json(post))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllPost = (req, res, next) => {
    models.Post.findAll({    order: [[
      "createdAt", "DESC"
    ]]})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
  };

exports.likePost = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let postId = req.params.id

  if (like === 1) { 
    Post.updateOne({_id: postId}, {$push: {usersLiked: userId}, $inc: { likes: +1}})
      .then(() => res.status(200).json({message: 'j\'aime ajouté !'}))
      .catch((error) => res.status(400).json({error}))
  }
  if (like === -1) {
    Post.updateOne({_id: postId}, {$push: {usersDisliked: userId}, $inc: {dislikes: +1}})
      .then(() => res.status(200).json({message: 'Dislike ajouté !'}))
      .catch((error) => res.status(400).json({error}))
  }
  if (like === 0) { 
    Post.findOne({_id: postId})
      .then((post) => {
        if (post.usersLiked.includes(userId)) { 
          Post.updateOne({_id: postId}, {$pull: {usersLiked: userId}, $inc: {likes: -1}})
            .then(() => res.status(200).json({message: 'Like retiré !'}))
            .catch((error) => res.status(400).json({error}))
        }
        if (post.usersDisliked.includes(userId)) { 
          Post.updateOne({_id: postId}, {$pull: {usersDisliked: userId}, $inc: {dislikes: -1}})
            .then(() => res.status(200).json({message: 'Dislike retiré !'}))
            .catch((error) => res.status(400).json({error}))
        }
      })
      .catch((error) => res.status(404).json({error}))
  }
}