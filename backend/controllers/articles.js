const router = require("express").Router();
const Sequelize = require("sequelize");
const ArtModel = require("../models/article");
const multer = require("multer");
const fs = require("fs");
// const sequelize = require('../config/db.config')

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.USER_NAME}`, `${process.env.PASSWORD_DB}`, {
  //require('../config/db.config)
  host: "localhost",
  dialect: "mysql",
});

const article = ArtModel(sequelize, Sequelize);

exports.published = async (req, res, next) => {
  console.log("-------All Articles--------");
  console.log("-------req.params-------", req.query);
  const allArticle = await article.findAll();
  res.json(allArticle);
  console.log(allArticle);
};

exports.OnePublished = async (req, res, next) => {
  console.log("-------req.query One--------", req.query.id);
  const params = req.query.id;
  const oneArticle = await article.findOne({ where: { id: `${params}` } });
  res.json(oneArticle);
};


exports.publish = async (req, res, next) => {
  console.log("req.body.image", typeof req.body.media);
  console.log("req.body", req.body);

  const publish = await article.create({
    usersId: req.body.usersId,
    content: req.body.content,
    like: req.body.like,
    dislike: req.body.dislike,

    media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  console.log("publish", publish.usersId);
  if (publish) {
    res.json(publish);
  } else {
    res.json({ message: "erreur 404" });
  }
};

exports.destroyArt = async (req, res) => {
  const params = req.query.id;
  console.log(params);
  const suprimmer = await article.destroy({ where: { id: params } });
  if (suprimmer) {
    res.json({ message: "Article supprimé" });
  } else {
    res.json({ message: "erreur 404" });
  }
};
