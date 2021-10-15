const models = require('../models');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN); 
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

exports.modifyPost = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN); 
  const userId = decodedToken.userId;
  const user = await models.User.findOne({  where: { id: userId }});
  if (user.admin){
    models.Post.update(
      {title: req.body.title,
      gif: req.body.gif,
      description: req.body.description },
      {where: { id: req.params.id, UserId: userId }})
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch((error) => res.status(400).json({ error }));
  }
  else {
    models.Post.findAll({ where: { id: req.params.id, UserId: userId }})
    .then(async() => { await models.Post.update({  
        title: req.body.title,
        gif: req.body.gif,
        description: req.body.description }, 
        {where: { id: req.params.id, UserId: userId }
      });
      res.status(200).json({ message: 'Post modifié !'})
    })
    .catch((error) => res.status(400).json({ error }));
}};

exports.deletePost = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN); 
  const userId = decodedToken.userId;
  const user = await models.User.findOne({  where: { id: userId }});
  if (user.admin){
    models.Comment.destroy({ where: { PostId: req.params.id }})
    models.Post.destroy({ where: { id: req.params.id}})
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
    .catch((error) => res.status(400).json({ error }));
  }
  else { await models.Comment.destroy({ where: { PostId: req.params.id }})
    .then(async() => {  models.Post.destroy({ where: { id: req.params.id, UserId: userId }})
      res.status(200).json({ message: 'Post supprimé !'})
    })
    .catch((error) => res.status(400).json({ error }));
}};

exports.getAllPost = (req, res, next) => {
    models.Post.findAll({  include: [{
        model: models.User,
        attributes: ['firstName', 'lastName', 'id']}],
    order: [[
      "createdAt", "DESC"
    ]]})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
  };
