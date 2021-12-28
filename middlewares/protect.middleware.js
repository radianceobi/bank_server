const asyncHandler = require("express-async-handler");
const { decryptData } = require("../utils/encryptUserData");
const protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization) {
    const textArray = req.headers.authorization.split(" ");
    if (textArray[0].toLowerCase() !== "bearer") throw "invalid token type";
    if (textArray[1]) {
      req.user = decryptData(textArray[1]);
      //check for admin rights
      if (req.user.email === process.env.ADMIN_MAIL) {
        req.admin = true;
      }
      next();
      return;
    }
    throw "oops!! error with auth header";
  }
  throw { error: "auth header not found" };
});

module.exports = { protect };
