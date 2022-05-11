const router = require("express").Router();
const multer = require('../../middleWare/multer-config');
const passWord = require("../../middleWare/passwordValidate.js");
const auth = require('../../middleWare/auth')
const userControl = require('../../controllers/users');
const ExpressBrute = require("express-brute");
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);



router.post("/signup",  userControl.signup);
//router.post("/login",  userControl.login);
router.post(
    "/login",
    bruteforce.prevent,
    userControl.login,
    function (req, res, next) {
      res.send("Success!");
    }
  );

router.get("/user/multi",auth,  userControl.GetMultiUsers);
router.get("/user",auth,  userControl.GetOneUser);

router.put("/user/delete",auth,  userControl.destroyUser);
router.put("/user/update",auth, multer,  userControl.updateUser);

router.get("/user/all",auth,  userControl.GetAllUsers);
router.get("/adminUser",  userControl.GetAdminUser);

module.exports = router;
