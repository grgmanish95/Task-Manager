const express = require("express");
const multer = require("multer");

//for getting file extension
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploadfiles",
  //cb call back
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
//filter
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match('.pdf','.doc','.txt','.tex','.wpd','.odt','.jpeg','.rtf')) {
    let err = new Error("Only files are allowed");
    err.status = 400;
    return cb(err, false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
 // fileFilter: imageFilter,
  
});

uploadRouter = express.Router();
uploadRouter.route("/").post(upload.single("myfile"), (req, res, next) => {
  res.json(req.file);
});

module.exports = uploadRouter;
