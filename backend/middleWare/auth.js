const jwt = require("jsonwebtoken");
const admin = require("../controllers/users");
const db = require("../models");
const user = db.users;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.USER_NAME}`,
  `${process.env.PASSWORD_DB}`,
  {
    //require('../config/db.config)
    host: "localhost",
    dialect: "mysql",
  }
);

// module.exports = async (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1]; // récupère le token dans le header
//   console.log("-----token-----", token);
//   const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // décrypte le token
//   const userId = decodedToken.id; // récupère l'id du token
//   console.log("-----decodedToken.id-----", userId);
//   console.log("----req.body.id-----", req.body.id);

//   const oneUser = await user
//     .findOne({
//       where: { id: `${userId}` },
//     })
//     .then((res) => {
//       console.log("RES", res.role);
//       let adm = res.role;
//       console.log("RES2", adm);

//       if (adm != admin) {
//         console.log(" autorisé");
//         next();
//       } else {
//         console.log("NON AUTH");
//       }
//     })
//     .catch(
//       res.status(401).json({
//         error: new Error(),
//         message: "Requete non autorisée",
//       })
//     );
// };

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // récupère le token dans le header
  console.log("-----token-----", token);
  const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // décrypte le token
  const userId = decodedToken.id; // récupère l'id du token

  console.log("-----verify token-------", decodedToken);
  console.log("-----userId-------", userId);
  console.log("-----req.body.id-------", req.body.id);

  const oneUser = await user
    .findOne({
      where: { id: `${userId}` },
    })
    .then((res) => {
      console.log("RES", res.role);
      let adm = res.role;
      let admin = "admin";
      console.log("RES2", adm);

      if (adm === admin) {
        console.log(" ADMIN");
        return true;
      } else {
        console.log(" NON ADMIN");
        return false;
      }
    });

  try {
    console.log("on est là try auth");
    //console.log(userId);

    console.log("oneUser", oneUser);

    if (req.body.id == userId || oneUser == true) {
      // compare l'id du token avec l'id utilisateur
      next(); // si Id identhique ça continu " la route est protégée"
    } else {
      throw "Id utilisateur invalide";
    }
  } catch {
    res.status(401).json({
      error: new Error(),
      message: "Requete non autorisée",
    });
  }
};
