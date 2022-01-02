const multer = require("multer");

const storage = multer.diskStorage({
  destination: "avatars",
  filename: (req, file, cb) => {
    cb(null, `avatar_${Date.now()}`);
  },
});

const avatarUpload = multer({ storage });
module.exports = avatarUpload;
