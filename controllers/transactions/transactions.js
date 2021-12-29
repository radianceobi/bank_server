const asyncHandler = require("express-async-handler");
const { getBankList, resolveName } = require("../../utils/paystack");
const { sendMoney, getTransactions } = require("../../utils/transactions");
const { UpdateUserDetail } = require("../../utils/userDataHelpers");

const getBanks = asyncHandler(async (req, res, next) => {
  res.send(await getBankList());
});

const resolveAccount = asyncHandler(async (req, res, next) => {
  const { body } = req;
  res.send(await resolveName(body.account_number, body.bank_code));
});

const transfer = asyncHandler(async (req, res, next) => {
  const { to, amount } = req.body;
  const { email } = req.user;

  const remain = await sendMoney(email, to, amount);
  //update user

  res.status(200).json({
    transactions: await getTransactions(email),
    updatedUserDetail: await UpdateUserDetail({ balance: remain }, email),
  });
});

const getTransac = asyncHandler(async (req, res, next) => {
  res.status(200).json(await getTransactions(req.user.email));
});
//increase balance

const alter = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  res.status(200).json(await UpdateUserDetail({ ...req.body }, email));
});
module.exports = {
  getBanks,
  resolveAccount,
  transfer,
  alter,
  getTransac,
};
