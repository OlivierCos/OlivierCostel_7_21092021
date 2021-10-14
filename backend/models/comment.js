'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Comment.init({
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};