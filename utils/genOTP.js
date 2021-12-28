const genOTP = async (length = 4) => {
  return await new Promise((resolve, reject) => {
    let otp = "";
    for (x = 0; x < length; x++) {
      otp += Math.floor(Math.random(0) * 10);

      // console.log(length, x + 1);
      x + 1 === length && resolve(Number(otp));
    }
  });
};

module.exports = genOTP;
