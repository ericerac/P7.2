const router = require("express").Router();
const multer = require('../../middleWare/multer-config');

const auth = require('../../middleWare/auth')
const userControl = require('../../controllers/users');





router.post("/signup",  userControl.signup);
router.post("/login",  userControl.login);

router.get("/user",  userControl.GetOneUser);
router.get("/user/all",  userControl.GetAllUsers);
router.put("/user/delete",  userControl.destroyUser);
router.put("/user/update",multer,  userControl.updateUser);




module.exports = router;
