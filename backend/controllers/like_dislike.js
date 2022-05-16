const router = require("express").Router();
const Sequelize = require("sequelize");
const LikeModel = require("../models/like");
const DislikeModel = require("../models/dislike");

const db = require("../models");
const Comment = db.comment;
const articles = db.article;
const User = db.users;
const Like = db.like;
const Dislike = db.disLike;

// --------------------------------------------//

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

const like = LikeModel(sequelize, Sequelize);
const dislike = DislikeModel(sequelize, Sequelize);

//--------------GET ARTICLES--------------------OK--//
exports.AllLike = async (req, res, next) => {
  console.log("-------All Articles--------");
  console.log("-------req.params-------", req.query);
  const allLike = await Like.findAll({
    include: [
      {
        model: User,
        as: "user",
        require: true,
      },
    ],
  });
  res.json(allLike);
  console.log(allLike);
};

//-----------------POST LIKE---------------------//

exports.postLike = async (req, res, next) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  const params = req.body;
  let likePost = req.body;

  // if(params.like > 0){
  //     console.log("LIKE = 1");

  // }
  // if(params.like < 1){
  //     console.log("LIKE = 0");

  // }
  // if(params.disllike > 0){
  //     console.log("DISLIKE = 1");

  // }
  // if(params.dislike < 1){
  //     console.log("DISLIKE = 0");

  // }

  // const OneLike = await Like.findOne({
  //     where: { userId: `${params.id }` } && {like: params.like } && {articleId:params.articleId } ,
  // });
  // if (!OneLike){

  const createLike = await Like.create({
    ...likePost,
  });
  console.log("ART-POST", likePost);
  if (createLike) {
    res.json(createLike);
  } else {
    res.json({ message: "erreur 404" });
  }
};
//else {

//     res.json({message:"Article deja liked par cet utilisateur"});
// }
// };

//   async function updateOrCreate (model, where, newItem) {
//     // First try to find the record
//    const foundItem = await model.findOne({where});
//    if (!foundItem) {
//         // Item not found, create a new one
//         const item = await model.create(newItem)
//         return  {item, created: true};
//     }
//     // Found an item, update it
//     const item = await model.update(newItem, {where});
//     return {item, created: false};
// }
