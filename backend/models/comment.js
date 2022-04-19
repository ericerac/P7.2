module.exports = (sequelize, type) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: type.STRING(),
    },
    image: {
      type: type.CHAR(255),
    },
    id: {
      type: type.INTEGER(),
      primaryKey: true,
    },
    like: {
      type: type.INTEGER(),
      
    },
  });
  return Comment;
};
