const router = require('express').Router();


const artControl = require('../../controllers/articles');

 const likeDislike = require('../../controllers/like_dislike');
const auth = require('../../middleWare/auth')


// router.get("/",  likeDislike.liked);                 // FALTA AUTH
// router.get("/",  likeDislike.disliked);  
//     // FALTA AUTH
// router.put("/",  likeDislike.liker);                // FALTA AUTH
// router.put("/",  likeDislike.disliker);        // FALTA AUTH



 router.post("/post",  likeDislike.postLike);
 router.get("/all",  likeDislike.AllLike);
// router.post("/dislike",  likeDislike.publish);

module.exports = router;