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
     likes:{
       type:type.INTEGER(),
       defaultValue: 0,
     },
     dislikes:{
       type:type.INTEGER(),
       defaultValue: 0,
     },
      userId:{
        type:type.INTEGER(36)
      },
      
      
      
    });

    
    return Article;
  };

  