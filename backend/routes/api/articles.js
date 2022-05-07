const router = require('express').Router();

const userControl = require('../../controllers/users');
const artControl = require('../../controllers/articles');
const commentControl = require('../../controllers/comment');
const multer = require('../../middleWare/multer-config');
const auth = require('../../middleWare/auth')


router.get("/all",  artControl.published); 
router.get("/",  artControl.OnePublished); 
router.put("/",  artControl.destroyArt); 

//router.post("/login",  artControl.publish);

router.post("/post",auth,multer, artControl.publish);

module.exports = router;