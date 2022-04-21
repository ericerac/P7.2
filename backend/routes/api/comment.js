const router = require("express").Router();
const multer = require('../../middleWare/multer-config');
const commentControl = require('../../controllers/comment');

router.get("/all", commentControl.published)
router.get("/", commentControl.OnePublished)
router.post("/",multer, commentControl.publish)
router.put("/", commentControl.destroyComment)


module.exports = router;