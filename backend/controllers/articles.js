const router = require("express").Router();
const Sequelize = require("sequelize");
const ArtModel = require("../models/article");
const multer = require("multer");
const fs = require("fs");

const db = require("../models");
const Comment = db.comment;
const articles = db.article;
const User = db.users;
const Like = db.like;
// const sequelize = require('../config/db.config')

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

const article = ArtModel(sequelize, Sequelize);

//--------------GET ARTICLES--------------------OK--//
exports.published = async (req, res, next) => {
  console.log("-------All Articles--------");
  console.log("-------req.params-------", req.query);
  const allArticle = await articles.findAll({
      include: [
        {
          model: Comment,
          as: "comment",
          require: true,

         include: {
           model: User,
           as: "user",
           require: true,
         },
        },
       {
         model: User,
         as: "user",
         require: true,
       },
       {
         model: Like,
         as: "like",
         require: true,
       },
      ],
  });
  res.json(allArticle);
  console.log(allArticle);
};

//--------------GET ONE ARTICLE--------------------OK--//

exports.OnePublished = async (req, res, next) => {
  console.log("-------req.query One--------", req.query.id);
  console.log("-------Comment--------", Comment);
  const params = req.query.id;
  const oneArticle = await articles.findOne({
    where: { id: `${params}` },
    include: [
      {
        model: Comment,
        as: "comment",
        require: true,

        include: {
          model: User,
          as: "user",
          require: true,
        },
      },
      {
        model: User,
        as: "user",
        require: true,
      },
    ],
  });
  res.json(oneArticle);
};

//------------PUBLISH-----------------------OK--//

exports.publish = async (req, res, next) => {
  console.log("req.body.image", typeof req.body.media);
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  let artPost = "";

  if (req.file) {
    console.log("condition IF FILE TRUE",);
    artPost = {
      userId: req.body.userId,
      content: req.body.content,

      media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    };
  } else {
    console.log("condition IF FILE FALSE");
    artPost = { ...req.body };
  }
  const publish = await article.create({
    ...artPost,
  });
  console.log("ART-POST", artPost);
  if (publish) {
    res.json(publish);
  } else {
    res.json({ message: "erreur 404" });
  }
};

//---------------DELETE-------------------- OK--//
exports.destroyArt = async (req, res) => {
  const params = req.query.id;
  console.log(params);
  const oneArticle = await articles.findOne({
    where: { id: `${params}` },
  });

  let data = oneArticle.media;

  console.log("oneArticle", oneArticle);
  console.log("Media", data);

  if (data) {
    const filename = data.split("/images/")[1];
    console.log("FILENAME", filename);
    fs.unlink(`images/${filename}`, () => {});
  }
  const suprimmer = await article.destroy({ where: { id: params } });

  if (suprimmer) {
    res.json({ message: "Article supprimé" });
  } else {
    res.json({ message: "erreur 404" });
  }
};
