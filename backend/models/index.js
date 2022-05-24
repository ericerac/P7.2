const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const userModel = require("./users.js");
const ArtModel = require("./article.js");
const CommentModel = require("./comment.js");
const LikeModel = require("./like.js");
const DislikeModel = require('./dislike.js')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = userModel(sequelize, Sequelize);
db.article = ArtModel(sequelize, Sequelize);
db.comment = CommentModel(sequelize, Sequelize);
 db.like = LikeModel(sequelize, Sequelize);
 db.disLike = DislikeModel(sequelize, Sequelize);

db.users.hasMany(db.article, { as: "article" });
db.users.hasMany(db.comment, { as: "comment" });
db.users.hasMany(db.disLike, { as: "dislike" });


db.article.hasMany(db.comment, { as: "comment" });

db.article.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

 db.article.hasMany(db.like, { as: "like" })
 db.article.hasMany(db.disLike, { as: "dislike" })
 
 db.disLike.belongsTo(db.article, {
   foreignKey: "articleId",
   as: "article",
 })
 db.disLike.belongsTo(db.users, {
   foreignKey: "userId",
   as: "user",
 });

db.comment.belongsTo(db.article, {
  foreignKey: "articleId",
  as: "article",
});

db.comment.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//       db[modelName].associate(db);
//   }
// });
module.exports = db;

// db.role.belongsToMany(db.user, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
//   });
//   db.user.belongsToMany(db.role, {
//     through: "user_roles",
//     foreignKey: "userId",
//     otherKey: "roleId"
//   });
//   db.ROLES = ["user", "admin", "moderator"];
// `likes_ibfk_2` index table likes articleId