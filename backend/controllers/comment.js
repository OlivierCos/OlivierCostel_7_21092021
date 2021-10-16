const models = require('../models');
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN); 
  const userId = decodedToken.userId;  
  models.Comment.create({
      PostId: req.params.id,
      UserId: userId,
      comment: req.body.comment,})
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.deleteComment = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;
  const user = await models.User.findOne({  where: { id: userId }});
  if (user.admin){
    models.Comment.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
    .catch((error) => res.status(400).json({ error }));
  }
  else {
    models.Comment.destroy({ where: { id: req.params.id, UserId: userId }})
      .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
      .catch((error) => res.status(400).json({ error }));
}};


exports.getAllComment = (req, res, next) => { 
  models.Comment.findAll({   
    include: [{
      model: models.User,
      attributes: ['firstName', 'lastName', 'id'] 
    }],
  order: [[
    "createdAt", "DESC"
  ]]})
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
  };
