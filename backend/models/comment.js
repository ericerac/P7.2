module.exports = (sequelize, type) => {
  const Comment = sequelize.define("comment", {
    commentTxt: {
      type: type.STRING,
    },
    image: {
      type: type.STRING,
    },
    id: {
      type: type.INTEGER,
      primaryKey: true,
    },
  });
  return Comment;
};
