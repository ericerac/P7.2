const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const userModel = require('./users.js')
const ArtModel = require('./article.js')
const CommentModel = require('./comment.js')

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

const users = userModel(sequelize, Sequelize);
const article = ArtModel(sequelize, Sequelize);
const comment = CommentModel(sequelize, Sequelize);

//(db.users = require("./users.js")), (sequelize, Sequelize);
//(db.article = require("./article.js")), (sequelize, Sequelize);

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
