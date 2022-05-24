const router = require("express").Router();
const Sequelize = require("sequelize");
const LikeModel = require("../models/like");
const DislikeModel = require("../models/dislike");
const {Op} = require("sequelize");
const db = require("../models");
const { json } = require("body-parser");
const Comment = db.comment;
const article = db.article;
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
  const allLike = await Dislike.findAll({
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
  console.log("REQ:BODY LIKE BACK", req.body);

  const params1 = req.body.userId;
  const params2 = req.body.articleId;
  const likePost = req.body.like;
  const dislikePost = req.body.dislike;

  //  if(likePost > 0 === UserLike.likes){
  //      console.log("LIKE = 1");
  //  }
  //  if(likePost < 1 === UserLike.likes){
  //      console.log("LIKE = 0")
  //  }
  //  if(dislikePost > 0 === UserLike.dislikes){
  //      console.log("DISLIKE = 1")
  //  }
  //  if(dislikePost < 1 === UserLike.dislikes){
  //      console.log("DISLIKE = 0");
  //  }

  const UserLike = await Dislike.findOne({
    where: { userId: `${params1}`, articleId: `${params2}`,like:`${likePost}`,dislike:`${dislikePost}` },
  });

  if (UserLike) {
    console.log("DEJA LIKED", UserLike);
     res.status(401).json({message:" Article déjà liked"});
     return
    
  }

  const createLike = await Dislike.create({
    like: likePost,
    dislike:dislikePost,
    userId: params1,
    articleId: params2,

  });
  console.log("ART-POST","LIKE-->", likePost,"DISLIKE-->", dislikePost);
  if (createLike) {

    const countLike = await Dislike.count ({
      where:{articleId:params2, like:1}
      
    });
    const countdisLike = await Dislike.count ({
      where:{articleId:params2, dislike:1}
      
    });
console.log("COUNTLIKE--->",countLike);
console.log("COUNTLIKE--->",countdisLike);
     const artLike = await article
     .update(
       {
         likes: countLike,
         dislikes: countdisLike,
       },
       {
         where: { id:`${params2}`},
       }
     )
console.log("UPDATE ART PUSH--->","ARTICLE-ID--->",params2,"LIKE--->",likePost,"DISLIKE--->",dislikePost);
    if(artLike){
//  res.status(201).json({message:"avis enregistré"},createLike);
 return
    }
   
  } else {
  //   const suprimmer = await article.destroy({ where: { id: params } });

  // if (suprimmer) {
  //   res.json({ message: "Article supprimé" });
  // } else {
  //   res.json({ message: "erreur 404" });
  // }
    res.json({ message: "erreur 404" });
  }
};



//-----------------PUSH LIKE ARTICLE TABLE----------------//
// exports.pushLike = async (req, res, next) => {
//   console.log("REQ:BODY LIKE BACK PUSH", req.body);
//   const id = req.body.articleId;

//   article
//     .update(
//       {
//         likes: +req.body.likes,
//         dislikes: +req.body.dislikes,
//       },
//       {
//         where: { id: id },
//       }
//     )
//     .then((data) => {
//       console.log("REUSSI");
//       const res = {
//         success: true,
//         data: data,
//         message: "liked réussie",
//       };
//       return res;
//     })
//     .catch((error) => {
//       console.log("ERREUR");
//       const res = {
//         success: false,
//         error: error,
//         message: "Echec lors de la mise à jour",
//       };
//       return res;
//     });
//   res.json(res._results);
// };
