const nodemailer = require("nodemailer");
const { EMAIL_1, PASSWORD } = process.env;

const sendMail = async ({
  html,
  user = EMAIL_1,
  pass = PASSWORD,
  from = `KeyQuestCapital <${EMAIL_1}>`,
  to,
  subject = "Hello ✔",
}) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "keyquestcapital.org",
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    let info = await transporter.sendMail({
      from, // sender address
      to,
      subject, // Subject line
      html,
    });

    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendMail;
