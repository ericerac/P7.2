const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("on est là auth");
    //console.log(userId);

    const token = req.headers.authorization.split(" ")[1]; // récupère le token dans le header
    console.log("-----token-----",token);
    const decodedToken = jwt.verify(token,`${process.env.TOKEN}`); // décrypte le token
    console.log("-----verify token-------");
    const userId = decodedToken.userId; // récupère l'id du token
    if (req.body.userId && req.body.userId !== userId) {
      // compare l'id du token avec l'id utilisateur
      throw "Invalid user ID";
    } else {
      next(); // si Id identhique passe au middleware suivant " la route est protégée"
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};


// router.get('/me',
//  async(req,res,next)=>{
//   try {
//     let token = req.headers['authorization'].split(" ")[1];
//     let decoded = jwt.verify(token,process.env.SECRET);
//     req.user = decoded;
//     next();
//   } catch(err){
//     res.status(401).json({"msg":"Couldnt Authenticate"});
//   }
//   },
//   async(req,res,next)=>{
//     let user = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
//     if(user === null){
//       res.status(404).json({'msg':"User not found"});
//     }
//     res.status(200).json(user);
//  }); 