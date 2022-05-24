//const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { QueryTypes } = require("@sequelize/core");
const UserModel = require("../models/users");

const Sequelize = require("sequelize");

const db = require("../models");
const { use } = require("../app");

//-----------TABLES CONFIG-----------//

const Comment = db.comment;
const articles = db.article;
const user = db.users;
const dislikes = db.disLike;

//-------------------------------------//
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

const User = UserModel(sequelize, Sequelize);
//---------------------------------------------//

exports.deleteAll = (req, res) => {};

// -----------------SIGNUP-----------------------//

exports.signup = async (req, res, next) => {
  console.log("req.body", req.body.email);
  const hash = await bcrypt.hash(req.body.password, 10);
  const [project, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    },
  });
  if (created) {
    res.status(201).json(project);

    console.log(User);
  } else {
    res.status(404).json({ message: "Email utilisateur existant" });
  }
};

// -----------------LOGIN----------------------//

exports.login = async (req, res, next) => {
  console.log("on est au login", req.body);
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign({ id: user.id }, `${process.env.TOKEN}`, {
        expiresIn: "12h",
      });
      res
        .status(200)
        .json({ token: token, userId: user.id, userRole: user.role });
      console.log(token);
    } else {
      res.status(400).json({ error: "Mot de passe incorrect !" });
    }
  } else {
    res.status(404).json({ error: "Le compte n'existe pas" });
  }
};

// -----------GET ONE USER DATA-------------------//

exports.GetOneUser = async (req, res, next) => {
  console.log("-------req.body One--------", req.body.id);
  console.log("-------req.query One--------", req.query.id);
  const params = req.query.id;
  //const params = req.body.id;
  const oneUser = await user.findOne({
    where: { id: `${params}` },
    include: [
      {
        model: articles,
        as: "article",
      },
      {
        model: dislikes,
        as: "dislike",
      },
      {
        model: Comment,
        as: "comment",
      },
    ],
    distinct: true,
    col: "articleId",
  });
  res.json(oneUser);
};

//---------------GET ALL USERS--------------------//

exports.GetAllUsers = async (req, res, next) => {
  const allUsers = await user.findAll({
    include: [
      {
        model: articles,
        as: "article",
      },
      {
        model: Comment,
        as: "comment",
      },
    ],
    distinct: true,
    col: "articleId",
  });
  res.json(allUsers);
};

//---------------GET MULTI USERS--------------------//

exports.GetMultiUsers = async (req, res, next) => {
  const params = req.body.id;
  let AllUsers = [];
  //const params = req.query.id;
  for (let i of params) {
    const allUsers = await user.findAll({
      where: { id: params },
      include: [
        {
          model: articles,
          as: "article",
        },
        {
          model: Comment,
          as: "comment",
        },
      ],
      distinct: true,
      col: "articleId",
    });
    AllUsers = allUsers;
  }
  if (AllUsers) {
    res.json(AllUsers);
  } else {
    res.status("erreur 404");
  }
};

//------------UPDATE PROFIL USER---------------//

exports.updateUser = async (req, res) => {
  console.log("req.body 1 -->", req.body);
  const form = "";
  form.toString(req.body).valueOf(req.body);
  console.log("req.body 2 -->", form);
  const formData = req.body;
  console.log("req.body-->", formData);
  const id = formData.userId;

  console.log("req.body.userId-->", id);
if(!req.file){
  Data={
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  // password:formData.password,
  userId: formData.userId,}
}else{
  Data={

    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    // password:formData.password,
    userId: formData.userId,
    media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  }

}
  const response = await User.update(
    {
      ...Data
    },
    {
      where: { id: id },
    }
  )
  .then((data) => {
      console.log("REUSSI");
      const res = {
        success: true,
        data: data,
        message: "Mise à jour réussie",
      };
      return res;
    })
    .catch((error) => {
      console.log("ERREUR");
      const res = {
        success: false,
        error: error,
        message: "Echec lors de la mise à jour",
      };
      return res;
    });
  res.json(response);
};

//-----------DELETE USER----------------//

//  exports.destroyUser = async (req, res) => {
//    const params = req.query.id;
//    const params1 = req.body.id;
//    console.log("id TO DESTROY", params)
//    const supprimer = await User.destroy({ where: { id: params.id } });
//    console.log("SUPPRIMER",supprimer);
//    console.log("PARAMS.ID",params.id)
//    if (supprimer) {
//      res.json({ message: "Compte Utilisateur supprimé" });
//    } else {
//      res.json({ message: "erreur 404" });
//    }
//  };

exports.destroyUser = async (req, res) => {
  const params = req.query.id;
  const params1 = req.body.id;
  console.log("REQ.QUERY.ID", params);
  console.log("REQ.BODY.ID", params1);
  // console.log("HEADERS------>>>", req.headers.authorization);
  const UserTo = await user.findOne({
    where: { id: `${params}` },
  });
  console.log("USER-TO",UserTo);
  if (!UserTo) {
     res.json({ message: "l'utilisateur n'existe pas" });
     return
  } else {
    console.log("REQ.BODY.ID", params1);
    
      // console.log("-------req--------", req);
      // console.log("-------req.body One--------", req.body.Id);
      // console.log("-------req.query One--------", req.query.role);
      //const params = req.query.id;
      // const params = req;
      const UserOne = await user.findOne({
        where: { id: `${params1}` },
      });
      console.log("USER-ONE",UserOne);
      console.log("USER-TO",UserTo);
      if (!UserOne.role === "admin" || UserOne.id != UserTo.id) {
        res.status(401).json({message:" requete non autorisée"})
        
        } else {
          const suprimmer = await User.destroy({ where: { id: params } });
          if (suprimmer) {
            res.json({ message: "Compte utilisateur supprimé" });
        }
      }
    
  }
};

// exports.GetAdminUser = async (req) => {
//   console.log("-------req--------", req);
//   console.log("-------req.body One--------", req.body.Id);
//   console.log("-------req.query One--------", req.query.role);
//   //const params = req.query.id;
//   const params = req;
//   const adminUser = await user.findOne({
//     where: { id: `${params}` },
//   });
//   res.json(adminUser);
// };
