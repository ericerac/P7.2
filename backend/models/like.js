module.exports = (sequelize, type) => {
    const Like = sequelize.define("like", {
      
      
      id: {
        type: type.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },

      like: {
        type: type.INTEGER(255),
      },

      dislike: {
        type: type.INTEGER(255),
      },

      userId: {
        type: type.UUID,
      },
  
      articleId: {
        type: type.INTEGER(10),
      },
  
       
    });
    
    return Like;
  };
  