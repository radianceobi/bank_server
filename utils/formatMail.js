const formatMail = (name, id) => {
  console.log(process.env.SERVER_URL);
  return `
        <div style="max-width: 400px; padding: 10px; margin: auto">
      <h3>hello ${name}</h3>
      <h4>THANK YOU FOR CHOOSING TO TRY US OUT!</h4>

      <p>Your account has been successfully created...</p>
      <a
        href="${process.env.SERVER_URL}/verify-email?id=${id}&&verify=true"
        style="
          padding: 5px;
          color: white;
          background-color: #049dd9;
          text-decoration: none;
          border-radius: 5px;
        "
        >click</a
      >
      <p>to verifify your account or ignore if you did not initaite this</p>
      <p>Cheers!</p>
    </div>
        `;
};

module.exports = formatMail;
