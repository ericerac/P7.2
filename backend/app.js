const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const db = require("./models"); // index.js
const Sequelize = require("sequelize");

 const sequelize = new Sequelize("bd_groupo", "root", "1029!rieN", { //require('../config/db.config)
   host: "localhost",
   dialect: "mysql",
 });

const userRoutes = require("./routes/api/user");
const ArtRoutes = require("./routes/api/articles");
const commentRoutes = require('./routes/api/comment');
const likeRoutes = require('./routes/api/like_dislike');





db.sequelize.sync({ force: false }).then(() => {
  console.log("Connectée");
  

});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//  - application/json
app.use(express.json());

//  - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.use("/images", express.static("images"));
app.use(express.static(path.join(__dirname,"images")));

app.use("/", userRoutes);
app.use("/login", userRoutes);

app.use("/article", ArtRoutes);

app.use("/comment", commentRoutes);

app.use("/like", likeRoutes);
app.use("/art", likeRoutes);
app.use("/dislike", likeRoutes);



module.exports = app;
