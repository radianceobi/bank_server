const verify = require("../controllers/emailVerification");
const { createAccount, login, getOTP } = require("../controllers/users/auth");
const { patchUserDetail } = require("../controllers/users/editUserDetail");
const { protect } = require("../middlewares/protect.middleware");
const avatarUpload = require("../middlewares/uploader.middleware");

const user = require("express").Router();
// user.route("/ping").get((req, res, next) => res.send("working"));

user
  .route("/user/create-account")
  .post(avatarUpload.single("avatar"), createAccount);
user.route("/user/login").post(login);
user
  .route("/user")
  .patch(protect, avatarUpload.single("avatar"), patchUserDetail);
user.route("/verify-email").get(verify);

user.route("/gen-otp").get(protect, getOTP);
module.exports = user;
