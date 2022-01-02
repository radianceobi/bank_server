const { Op } = require("sequelize");
const { v1, v4 } = require("uuid");
const { Users, Transactions } = require("../models");

const sendMoney = async (from, to, amount) => {
  const { balance } = await Users.findOne({ where: { email: from } });
  if (Number(amount) < Number(balance)) {
    const remain = Number(balance) - Number(amount);
    await Users.update(
      { balance: remain },
      {
        where: {
          email: from,
        },
      }
    );

    await genTransactionHistory({
      from,
      to,
      amount,
    });
    //update user balance

    return remain;
  }
  throw "Transaction could not be completed, Insufficient balance";
};

//alter balance from admin
const changeBalance = async (email, balance) => {
  return await Users.update(
    { balance },
    {
      where: {
        email,
      },
    }
  );
};

//gen transaction history

const genTransactionHistory = async ({
  from,
  to,
  date = new Date().toUTCString(),
  amount,
}) => {
  await Transactions.create({
    reciever: to,
    sender: from,
    date,
    amount,
    transaction_id: v4() + "_" + Date.now(),
  });
  return true;
};

const delTransaction = async (transaction_id) => {
  await Transactions.destroy({
    where: {
      transaction_id,
    },
  });
  return true;
};
const getTransactions = async (email) => {
  return await Transactions.findAll({
    where: {
      [Op.or]: [{ sender: email }, { reciever: email }],
    },
    order: [["date", "desc"]],
  });
};
module.exports = {
  changeBalance,
  sendMoney,
  getTransactions,
  genTransactionHistory,
  delTransaction,
};
