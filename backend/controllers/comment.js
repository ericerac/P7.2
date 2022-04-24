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

exports.ArtComments = async (req, res, next) => {
  console.log("requete Params", req.query);
  const allComment = await comment.findAll({
    where: {
      articles_id: req.query.id,
    },
  });
  res.json(allComment);
};


exports.UsersComments = async (req, res, next) => {
  console.log("requete Params", req.query);
  const Comment = await comment.findAll({
    where: {
      users_id: req.query.users_id,
    },
  });
  res.json(Comment);
};

// find (req, res) {
//   return usuario.findAll({
//       where: {
//           : req.params.username,
//       }
//   })
//   .then(usuario => res.status(200).send(usuario))
//   .catch(error => res.status(400).send(error))
// },
// };
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
    users_id: req.body.users_id,
    articles_id: req.body.articles_id,
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
