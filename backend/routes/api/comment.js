const router = require("express").Router();

const commentControl = require('../../controllers/comment');

router.get("/", commentControl.published)
router.post("/", commentControl.publish)


module.exports = router;