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



module.exports = async (req, res, next) => {
  console.log("HEADERS------>>>", req.headers );
  console.log("HEADERS-AUTHO----->>>", req.headers.authorization );

  if(!req.headers.authorization){
    console.log("HEADERS AUTH------>>>", req.headers.authorization );

   
    res.status(401).json({
      error: new Error(),
      message: "Requete  sans token ou token invalide",
    });
    return
  }
  const token = req.headers.authorization.split(" ")[1]; // récupère le token dans le header
  console.log("-----token-----", token);
  const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // décrypte le token
  const userId = decodedToken.id; // récupère l'id du token

  console.log("-----verify token-------", decodedToken);
  console.log("-----userId-------", userId);
  console.log("-----req.query.id-------", req.query.id); // **+* changer a body  ****

  const oneUser = await user
    .findOne({
      where: { id: `${userId}` },
    })
    .then((res) => {
      console.log("RES", res.role);
      let role = res.role;
      let admin = "admin";
      console.log("RES2", role);

      if (role === admin) {  // reponse si UserId  correspond a l'admin
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

    if (req.body.id && req.body.id === userId  ) { // compare l'id du token avec l'id utilisateur
      if (oneUser = true){
        next();
      }
      
      throw "Id utilisateur invalide";
    }  else {
      
      next(); // si Id identhique ça continu " la route est protégée"
    }
  } catch {
    res.status(401).json({
      error: new Error(),
      message: "Requete non autorisée",
    });
  }
};
