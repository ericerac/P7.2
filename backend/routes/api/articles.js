const router = require('express').Router();

const userControl = require('../../controllers/users');
const artControl = require('../../controllers/articles');
const commentControl = require('../../controllers/comment');
const multer = require('../../middleWare/multer-config');
const auth = require('../../middleWare/auth.js')


router.get("/all",auth,  artControl.published); 
router.get("/",auth,  artControl.OnePublished); 
router.put("/delete",auth,  artControl.destroyArt); 



 router.post("/post",auth, multer, artControl.publish);

module.exports = router;