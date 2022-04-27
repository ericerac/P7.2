module.exports = (sequelize, type) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: type.STRING(),
    },
    media: {
      type: type.CHAR(255),
    },
    id: {
      type: type.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    like: {
      type: type.INTEGER(),
    },
    userId: {
      type: type.INTEGER(36),
    },

    articleId: {
      type: type.INTEGER(),
    },

     
  });
  // Comment.associate = function(models) {
  //   Comment.belongsTo(models.Article, {foreignKey: 'articleId', as: 'Article'})
  // };
  return Comment;
};
