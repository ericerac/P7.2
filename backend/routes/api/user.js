const router = require("express").Router();
// const Sequelize = require("sequelize");
// //const { DataTypes } = require("sequelize/types");
// const sequelize = new Sequelize("bd_groupo", "root", "1029!rieN", {
//   host: "localhost",
//   dialect: "mysql",
// });

// const dbUsers = require("../../models/users");
// const mysql = require("mysql2");

//const UserModel = require("../../models/users"); //(sequelize, DataTypes);
//const { Art } = require("../../models/article"); //(sequelize, DataTypes);
//const {User} = require('../../models/users')

// const User = UserModel(sequelize, Sequelize);
// const db = require("../../models"); // index.js
const auth = require('../../middleWare/auth')
const userControl = require('../../controllers/users');
// const connect = mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'1029!rieN',
//   database:'bd_groupo',
// });

// router.get("/users", (req, res) => {
//   console.log(req.query.id);

//   const project = User.findAll()
//     .then((data) => {
//       console.log(data);
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       console.log("erreur");
//     });

  //User.findOne({ id: req.body.id })

  // return users.findAll()
  // .then(use => {
  //   res.status(200).json(use)
  // });
//});

//router.post("/signup", async (req, res) => {
////const user = await users.(req.body)
//  res.json("route post user ./signup");
//});
router.post("/signup",  userControl.signup);
router.post("/login",  userControl.login);

// router.post("/signup", (req, res, next) => {
//   console.log("req.body", req.body.email);
//   const project = User.findOrCreate({where:{email:req.body.email}})
//     .then((use) => {
//       res.status(200).json(use);
//     })
//     .catch((err) => {
//       res.status(404).json({ message: "erreur 404" });
//     });
// });

// router.put("/signup", async (req, res) => {
//   //const user = await users.(req.body)
//   res.json("route put user ./signup");
// });


module.exports = router;
