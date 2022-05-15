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
      users_id: {
        type: type.UUID,
      },
  
      articles_id: {
        type: type.INTEGER(),
      },
  
       
    });
    
    return Dislike;
  };