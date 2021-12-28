const asyncHandler = require("express-async-handler");
const { UpdateUserDetail } = require("../../utils/userDataHelpers");

const verify = asyncHandler(async (req, res, next) => {
  const { id, verify } = req.query;
  if (id && verify === "true") {
    await UpdateUserDetail({ email_verification: 2 }, id);
    res.redirect(process.env.WEBSITE_URL);
    return;
  }
  throw "an unknown error";
});
module.exports = verify;
