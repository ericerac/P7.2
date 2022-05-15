module.exports = (sequelize, type) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: type.STRING(255),
    },
    media: {
      type: type.CHAR(255),
    },
    id: {
      type: type.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: type.CHAR(36),
    },

    articleId: {
      type: type.INTEGER(),
      defaultValue: '1',
    
    },
    

     
  });
  // Comment.associate = function(models) {
  //   Comment.belongsTo(models.Article, {foreignKey: 'articleId', as: 'Article'})
  // };
  return Comment;
};
