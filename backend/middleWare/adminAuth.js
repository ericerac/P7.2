
const jwt = require("jsonwebtoken");



module.exports = (req, res, next) => {
    try {
      console.log("on est là auth");
      //console.log(userId);
  
      const token = req.headers.authorization.split(" ")[1]; // récupère le token dans le header
      console.log("-----token-----",token);
      const decodedToken = jwt.verify(token,`${process.env.TOKEN}`); // décrypte le token
      const userId = decodedToken.id; // récupère l'id du token
      const roleAd = admin(userId);
      console.log("-----verify token-------",decodedToken);
      console.log("-----userId-------",userId);
      console.log("-----req.body.id-------",req.body.id);
      if ( req.body.id != userId ) {
        // compare l'id du token avec l'id utilisateur
        throw "Id utilisateur invalide";
      } else if (req.body.id != userId && roleAd == true){
  console.log("ROLE AD TRUE");
  next();
      }
      else{
        next(); // si Id identhique passe au middleware suivant " la route est protégée"
      };
      } catch {
      res.status(401).json({
        error: new Error(),
        message:("Requete non autorisée")
        
        
      });
    }
  };
  
  