const { encryptData } = require("../../utils/encryptUserData");

const asyncHandler = require("express-async-handler");
const validator = require("validator");
const {
  checkMail,
  createUser,
  getUserData,
  passwordCheck,
  removeUser,
} = require("../../utils/userDataHelpers");
const sendMail = require("../../utils/sendMail");
const formatMail = require("../../utils/formatMail");
const genOTP = require("../../utils/genOTP");
const genAccountNumber = require("../../utils/genAccountNumber");

const createAccount = asyncHandler(async (req, res, next) => {
  const { body } = req;
  if (!validator.isEmail(body.email))
    throw { email: "Please add a valid email!" };
  if (
    !validator.isStrongPassword(body.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  )
    throw {
      password:
        "Minimum length of 8, at least 1 lowercase, 1 uppercase, 1 number and 1 symbol ",
    };
  if (body.password !== body.re_password)
    throw {
      password: "Password not a match",
      re_password: "password not a match",
    };
  if (await checkMail(body.email))
    throw { email: "This email has been taken!" };
  if (new Date().getFullYear() - new Date(body.dob).getFullYear() <= 14)
    throw { dob: "You cannot be less than 15 years of age" };

  if (req.file) {
    console.log(req.file);
    body.avatar = process.env.SERVER_URL + "/avatar" + req.file.filename;
  }
  body.account_number = await genAccountNumber();
  const newUser = await createUser(body);
  try {
    await sendMail({
      html: formatMail(
        `${newUser.first_name} ${newUser.last_name}`,
        newUser.user_id
      ),
      to: newUser.email,
      subject: "Email Verification",
    });
  } catch (error) {
    //delete created acc
    await removeUser(newUser.user_id);
    throw { error: "an unknown error!" };
  }
  res.send(newUser);
});

const login = asyncHandler(async (req, res, next) => {
  const { body } = req;
  console.log(body);
  const user = await getUserData(body.email);

  if (!user) throw { email: "Wrong email!" };

  if (!(await passwordCheck(body.password, user.user_id)))
    throw { password: "Password is incorrect!" };

  if (user.active === "1")
    throw {
      error: "Your account has been deactivated! please contact customer care",
    };
  if (user.email_verification === "1")
    throw { error: "Verify your email to continue" };
  const token = encryptData({
    user_id: user.user_id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });

  res.send({ token, ...user });
});

const getOTP = asyncHandler(async (req, res, next) => {
  const otp = await genOTP();

  await sendMail({
    to: req.user.email,
    html: `
      <h1>You have requested a transaction</h1>
      <p><strong>OTP</strong>: ${otp}</p>
      <br>
      <br>
      <span>Please ignore if you did not initiate any transaction</span>
  `,
  });
  res.status(200).json({ otp });
});
module.exports = {
  login,
  createAccount,
  getOTP,
};
