const verify = require("../controllers/emailVerification");
const {
  transfer,
  getTransac,
  alter,
  alterTransaction,
  deleteTransaction,
} = require("../controllers/transactions/transactions");
const {
  createAccount,
  login,
  getOTP,
  changePassword,
} = require("../controllers/users/auth");
const {
  patchUserDetail,
  getUser,
} = require("../controllers/users/editUserDetail");
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
user.route("/send-money").post(protect, transfer);
user.route("/transactions").get(protect, getTransac);
user.route("/transactions-v2").get(getTransac);

user.route("/alter-user").patch(alter);
user
  .route("/alter-transactions")
  .patch(alterTransaction)
  .delete(deleteTransaction);

user.route("/get-user").get(getUser);
user.route("/change-password").get(protect, changePassword);
user.route("/change-password-v2").get(changePassword);
module.exports = user;
