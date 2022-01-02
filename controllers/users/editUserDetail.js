const asyncHandler = require("express-async-handler");
const { encrypt } = require("../../utils/encryption");
const {
  UpdateUserDetail,
  getUserData,
} = require("../../utils/userDataHelpers");
const validator = require("validator");

const patchUserDetail = asyncHandler(async (req, res, next) => {
  const { body, user, file, admin } = req;
  if (body.password) {
    validator.isStrongPassword(body.password);
    body.password = await encrypt(body.password);
  }
  if (file) body.avatar = process.env.SERVER_URL + "/avatar/" + file.filename;
  if (body.balance && body.user_id && !admin)
    throw { error: "cannot set balance if you are not an admin" };
  if (body.user_id) {
    res.send(await UpdateUserDetail(body, user.user_id));
    return;
  }
  res.send(await UpdateUserDetail(body, user.user_id));
});

const getUser = asyncHandler(async (req, res, next) => {
  res.status(200).json(await getUserData(req.query.email));
});
module.exports = {
  patchUserDetail,
  getUser,
};
