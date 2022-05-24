const router = require("express").Router();
const multer = require('../../middleWare/multer-config');
const commentControl = require('../../controllers/comment');



router.post("/post",multer, commentControl.publish)

router.put("/delete", commentControl.destroyComment)


module.exports = router;