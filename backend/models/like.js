module.exports = (sequelize, type) => {
    const Like = sequelize.define("like", {
      
      
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
    return Like;
  };
  