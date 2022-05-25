const router = require("express").Router();
const multer = require('../../middleWare/multer-config');
const commentControl = require('../../controllers/comment');
const auth = require('../../middleWare/auth.js')


router.post("/post",auth, multer, commentControl.publish)

router.put("/delete",auth,  commentControl.destroyComment)


module.exports = router;