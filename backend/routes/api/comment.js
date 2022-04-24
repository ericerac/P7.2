const router = require("express").Router();
const multer = require('../../middleWare/multer-config');
const commentControl = require('../../controllers/comment');

//router.get("/", commentControl.published)
//router.get("/all", commentControl.ArtComments)
router.get("/", commentControl.ArtComments)

router.post("/",multer, commentControl.publish)

router.put("/", commentControl.destroyComment)


module.exports = router;