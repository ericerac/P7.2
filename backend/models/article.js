const { article } = require(".");

module.exports = (sequelize, type) => {
    const Article = sequelize.define("article", {
      id: {
        type: type.INTEGER(10),
        primaryKey:true,
        autoIncrement:true,
      },
      content: {
        type: type.STRING(255)
      },
      media:{
        type:type.CHAR(255)
      },
      // like:{
      //   type:type.INTEGER(36)
      // },
      // dislike:{
      //   type:type.INTEGER(36)
      // },
      userId:{
        type:type.INTEGER(36)
      },
      
      
      
    });

      // Article.associate = function(models) {
      //   article.belongsTo(models.user, {foreignKey: 'userId', as: 'user'});
      //   article.hasMany(models.comment, {foreignKey: 'commentId', as: 'comment'})
      // };
    
    return Article;
  };

  