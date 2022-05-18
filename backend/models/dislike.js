module.exports = (sequelize, type) => {
    const Dislike = sequelize.define("dislike", {
      
      
      id: {
        type: type.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      like: {
        type: type.INTEGER(),
      },
      
      userId: {
        type: type.UUID,
      },
  
      articleId: {
        type: type.INTEGER(),
      },
  
       
    });
    
    return Dislike;
  };