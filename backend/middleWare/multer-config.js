const multer = require("multer");

const MIME_TYPES = {
  // dico des extensions images possibles
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     console.log(req);
//     // requête, fichier, callback
//     callback(null, "images"); // nom du dossier
//     console.log("MULTER STORAGE"); 
//   },
//   filename: (req, file, callback) => {      // requête, fichier, callback
    
//     const name = file.originalname.split(" ").join("_"); // nom d'origine du fichier
//     // "split et join" remplace d'éventuels espace dans le nom du fichier

//     const extension = MIME_TYPES[file.mimetype]; // selection dans le dico l'extension correspondante au mimetype du fichier
//     callback(null, name + Date.now() + "." + extension); // génere un nom unique du fichier //  + '.' + extension
//                                                 // Date.now() = timestype du fichier pour le rendre unique
//   },
// });

 const storage = multer.diskStorage({
   destination: (req, file, callback) => {
     console.log("STORAGE1");
     callback(null, "images");  
   },
   filename: (req, file, callback) => {
     const name = file.originalname.split(" ").join("_")
     const extension = MIME_TYPES[file.mimetype];
     console.log(name);
     callback(null, name + Date.now() + "." + extension);
   },
 });

 //const upload = multer({storage:storage});
 //exports.upload = upload.single('image');
module.exports = multer({ storage }).single("media");
// .single = fichier unique. 'image' = type de fichier
