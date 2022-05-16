const router = require("express").Router();
const Sequelize = require("sequelize");
const CommentModel = require("../models/comment");
const fs = require("fs");

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
// Objet sequelize
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

//------------GET ONE COMMENT--------------//

exports.OnePublished = async (req, res, next) => {
  console.log("-------req.query One--------", req.query.id);
  const params = req.query.id;
  const oneComment = await comment.findOne({ where: { id: `${params}` } });
  res.json(oneComment);
};

//-----------PUBLISH A COMMENT ---------------//

exports.publish = async (req, res, next) => {
  console.log("req.body.image", typeof req.body.media);
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  let artPost = "";

  if (req.file) {
    console.log("condition IF FILE TRUE");
    artPost = {
      // userId: req.body.userId,
      comment: req.body.comment,
      articleId: req.body.articleId,
      userId: req.body.userId,

      media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    };
  } else {
    console.log("condition IF FILE FALSE");
    artPost = {
      userId: req.body.userId,
      comment: req.body.comment,
      articleId: req.body.articleId,
      userId: req.body.userId,

    };
    console.log("REQ:BODY", req.body);
  }
  const publish = await comment.create({
    ...artPost,
  });
  console.log("ART-POST", artPost);
  if (publish) {
    console.log("PUBLISH", publish);
    res.json(publish);
  } else {
    res.json({ message: "erreur 404" });
  }
};
//-----------DELETE A COMMENT---------------//

// exports.destroyComment = async (req, res) => {
//   const params = req.query.id;
//   console.log("id", params);
//   const suprimmer = await comment.destroy({ where: { id: params } });
//   if (suprimmer) {
//     res.json({ message: "comment supprimé" });
//   } else {
//     res.json({ message: "erreur 404" });
//   }
// };

//------------_-___------__--_____--__//
exports.destroyComment = async (req, res) => {
  const params = req.query.id;
  console.log(params);
  const oneComment = await comment.findOne({
    where: { id: `${params}` },
  });

  let data = oneComment.media;

  console.log("oneComment", oneComment);
  console.log("Media", data);

  if (data) {
    const filename = data.split("/images/")[1];
    console.log("FILENAME", filename);
    fs.unlink(`images/${filename}`, () => {});
  }
  const suprimmer = await comment.destroy({ where: { id: params } });

  if (suprimmer) {
    res.json({ message: "Commentaire supprimé" });
  } else {
    res.json({ message: "erreur 404" });
  }
};