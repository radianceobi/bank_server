const { Users } = require("../models");

const sendMoney = async (from, to = "A user", amount) => {
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

const genTransactionHistory = () => {};
module.exports = {
  changeBalance,
  sendMoney,
};
