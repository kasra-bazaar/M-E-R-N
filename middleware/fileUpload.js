const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const MIME_TYPE_MAP = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/pmg": "png",
};
const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + "_" + ext);
    },
  }),
  filefilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Wrong mime type");
    cb(error, isValid);
  },
});

module.exports = fileUpload