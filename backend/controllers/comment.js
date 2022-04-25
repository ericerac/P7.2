const router = require("express").Router();
const Sequelize = require("sequelize");
const CommentModel = require("../models/comment");

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

const comment = CommentModel(sequelize, Sequelize);

//------------GET ALL ARTICLE'S COMMENTS--------------//

exports.ArtComments = async (req, res, next) => {
  console.log("requete Params", req.query);
  const allComment = await comment.findAll();
  res.json(allComment);
};

//------------GET ALL USER'S COMMENTS--------------//
exports.UsersComments = async (req, res, next) => {
  console.log("requete Params", req.query);
  const Comment = await comment.findAll({
    where: {
      userId: req.query.id,
    },
  });
  res.json(Comment);
};


exports.OnePublished = async (req, res, next) => {
  console.log("-------req.query One--------", req.query.id);
  const params = req.query.id;
  const oneComment = await comment.findOne({ where: { id: `${params}` } });
  res.json(oneComment);
};

exports.publish = async (req, res, next) => {
  console.log("req.body.image", typeof req.body.media);
  console.log("req.body", req.body);

  const imageUrl = req.body.media;

  const publish = await comment.create({
    userId: req.body.users_id,
    articleId: req.body.articles_id,
    articles_users_id: req.body.articles_users_id,
    comment: req.body.comment,
    like: req.body.like,
    dislike: req.body.dislike,

    media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  console.log("publish", publish);
  if (publish) {
    res.json(publish);
  } else {
    res.json({ message: "erreur 404" });
  }
};

exports.destroyComment = async (req, res) => {
  const params = req.query.id;
  console.log("id", params);
  const suprimmer = await comment.destroy({ where: { id: params } });
  if (suprimmer) {
    res.json({ message: "comment supprimé" });
  } else {
    res.json({ message: "erreur 404" });
  }
};
