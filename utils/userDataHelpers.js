const { isSame, encrypt } = require("./encryption");

const { Users } = require("../models");
const { Op } = require("sequelize");

const createUser = async (data) => {
  data.password = await encrypt(data.password);
  await Users.create(data);
  return await getUserData(data.email);
};

const checkMail = async (mail) => {
  if (!mail) throw "mail to be checked cannot be empty";
  const isMailInUse = await Users.findOne({
    where: {
      email: { [Op.like]: `%${mail}%` },
    },
  });
  if (isMailInUse) return true;
  return false;
};

const getUserData = async (data) => {
  const user = await Users.findOne({
    where: {
      [Op.or]: [{ email: data }, { user_id: data }],
    },
    attributes: {
      exclude: ["password"],
    },
  });
  if (user) return user.dataValues;
  return false;
};

const passwordCheck = async (string, user_id) => {
  const { password } = await Users.findOne({
    where: {
      user_id,
    },
  });
  console.log(password);
  return await isSame(string, password);
};

const UpdateUserDetail = async (data, user_id) => {
  await Users.update(data, {
    where: {
      user_id,
    },
  });
  return await getUserData(user_id);
};
const removeUser = async (user_id) => {
  await Users.destroy({
    where: {
      user_id,
    },
  });
};
module.exports = {
  passwordCheck,
  getUserData,
  checkMail,
  createUser,
  UpdateUserDetail,
  removeUser,
};
