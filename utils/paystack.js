const Paystack = require("paystack-node");

const paystack = new Paystack(process.env.TEST_KEY, "development");
const getBankList = async () => {
  const data = await paystack.listBanks({ currency: "NGN" });
  //   console.log(data.body);
  return data.body;
};

const resolveName = async (account_number, bank_code) => {
  console.log(account_number, bank_code);
  try {
    const detail = await paystack.resolveAccountNumber({
      account_number,
      bank_code,
    });
    console.log(detail.body);
    return detail.body;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBankList,
  resolveName,
};
