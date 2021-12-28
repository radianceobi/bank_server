const { hash, compare } = require("bcrypt");

const encrypt = async (data, salt = 10) => {
  return await hash(data, salt);
};

const isSame = async (string = "", hashedPassword = "") => {
  return await compare(string, hashedPassword);
};

module.exports = {
  isSame,
  encrypt,
};
