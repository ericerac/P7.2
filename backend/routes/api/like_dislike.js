const router = require('express').Router();


const artControl = require('../../controllers/articles');

 const likeDislike = require('../../controllers/like_dislike');
const auth = require('../../middleWare/auth')





 router.post("/post",auth,  likeDislike.postLike); //table relationelle


//  router.get("/all",  likeDislike.AllLike);


module.exports = router;