const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log('req in multer',file)
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  },
});



const uploader = multer({ storage: storage });

module.exports = uploader;
