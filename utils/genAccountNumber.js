const genAccountNumber = async (length = 10) => {
  const promise = await new Promise((resolve, reject) => {
    let number = "3145";
    for (x = number.length; x < length; x++) {
      number += Math.floor(Math.random() * 10);

      x + 1 === length && resolve(number);
    }
  });
  console.log(promise);
  return promise;
};

module.exports = genAccountNumber;
