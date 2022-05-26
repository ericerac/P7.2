const multer = require("multer");

const MIME_TYPES = {
  // dico des extensions images possibles
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};



const storage = multer.diskStorage({
  
  destination: (req, file, callback) => {
    console.log("STORAGE1");
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    console.log("req-MULTER",req.body,file);
    let name = file.originalname.split(" ").join("_");
    name = name.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    console.log("nom de l'image", name);
    callback(null, name + Date.now() + "." + extension);
  },
});


module.exports = multer({ storage }).single("media");

