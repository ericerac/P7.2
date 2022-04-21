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
    },
    like: {
      type: type.INTEGER(),
      
    },
    users_id: {
      type: type.INTEGER(),
      
    },
    articles_id: {
      type: type.INTEGER(),
      
    },
    articles_users_id: {
      type: type.INTEGER(),
      
    },

  });
  return Comment;
};
