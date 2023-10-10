const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(mp4|webp|webm|MPEG-4|mkv|mov|png|jpg|jpeg|pdf|doc|docx)$/)) {
      return cb(new Error("Please upload a image"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
