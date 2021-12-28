const { sign, verify } = require("jsonwebtoken");
const { SECRETE } = process.env;

const encryptData = (data) => {
  return sign(data, SECRETE);
};

const decryptData = (data) => {
  return verify(data, SECRETE);
};

module.exports = {
  encryptData,
  decryptData,
};
