const router = require("express").Router();
const Sequelize = require("sequelize");
const ArtModel = require("../models/article");
const multer = require("multer");
const fs = require("fs");

const db = require("../models");
const Comment = db.comment;
const articles = db.article;
const User = db.users;
const Dislike = db.disLike;


const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.USER_NAME}`,
  `${process.env.PASSWORD_DB}`,
  {
   
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
         model: Dislike,
         as: "dislike",
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
    res.status(200).json(publish);
  } else {
    res.json({ message: "erreur 404" });
  }
};



//---------------UPDATEPOST---------------------//

exports.updatePost = async (req, res) => {
  console.log("req.body 1 -->", req.body);
  const form = "";
  form.toString(req.body).valueOf(req.body);
  console.log("req.body 2 -->", form);
  const formData = req.body;
  console.log("req.body-->", formData.entries());
  const id = formData.articleId;

  console.log("req.body.userId-->", id);

  const response = await article.update(
    {
      formData,
      content: formData.content,
     
      media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
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
//---------------DELETE POST-------------------- OK--//
exports.destroyArt = async (req, res) => {
  const params = req.body.id;
  console.log("req.body.id",params);
  const oneArticle = await articles.findOne({
    where: { id: `${params}` },
  });
console.log("ONE ARTICLE",oneArticle);
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
