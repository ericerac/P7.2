const express = require('express');
const router = express.Router();

const userControl = require('../controllers/users')

//const passWord = require('../middleWare/passValidator.js')

const ExpressBrute = require("express-brute");
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);
// const multer = require('../middleWare/multer-config.js');

//router.post('/signup', passWord, userControl.signup); // passvalidator
router.post('/signup', userControl.signup);

router.get("/", (req, res) => {
  
  res.json({message:"welcome to ./get users"});
});


//router.post('/login', userControl.login);
//router.get('/update',userControl.update);

//router.post(
//    "/login",
//    bruteforce.prevent,
//    userControl.login, // error 429 if we hit this route too often
//    function (req, res, next) {
//      res.send("Success!");
//    }
//  );

  module.exports = router;

//  
//  var express = require('express');
//  var route = express();
//  // import controller
//  const controller = require('./controller')
//  // create route
//  route.get('/index',controller.index);
//  route.get('/list',controller.list);
//  route.get('/create',controller.create);
//  route.get('/update',controller.update);
//  route.get('/get/:id',controller.get);
//  route.get('/delete/:id',controller.delete);
//  
//  // export route
//  module.exports = route;