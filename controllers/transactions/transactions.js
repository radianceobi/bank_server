const asyncHandler = require("express-async-handler");
const { getBankList, resolveName } = require("../../utils/paystack");

const getBanks = asyncHandler(async (req, res, next) => {
  res.send(await getBankList());
});

const resolveAccount = asyncHandler(async (req, res, next) => {
  const { body } = req;
  res.send(await resolveName(body.account_number, body.bank_code));
});

module.exports = {
  getBanks,
  resolveAccount,
};
