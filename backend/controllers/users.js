//const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const Op = db.Sequelize.Op;
const { QueryTypes } = require("@sequelize/core");
const UserModel = require("../models/users");
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

const User = UserModel(sequelize, Sequelize);

// Retrieve all user
exports.findAll = (req, res) => {};
// Find a single user

// Update userData
exports.update = (req, res) => {};
// Delete an user
exports.delete = (req, res) => {};
// Delete all user
exports.deleteAll = (req, res) => {};
// Find all article's user.
exports.findAllPublished = (req, res) => {};

// --------------signup-----------------------
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

// -------------login-----------------
exports.login = async (req, res, next) => {
  console.log("on est au login", req.query);
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign({ id: user.id }, `${process.env.TOKEN}`);
      res.status(200).json({ token: token, userId: user.id });
      console.log(token);
    } else {
      res.status(400).json({ error: "Mot de passe incorrect !" });
    }
  } else {
    res.status(404).json({ error: "Le compte n'existe pas" });
  }
};

//-----------SUPPRIMER----------------//
exports.destroyUser = async (req, res) => {
  const params = req.query.id;
  console.log("id",params);
  
  console.log("id",params);
  const suprimmer = await User.destroy({ where: { id: params } });
  if (suprimmer) {
    res.json({ message: "user supprimé" });
  } else {
    res.json({ message: "erreur 404" });
  }
};
