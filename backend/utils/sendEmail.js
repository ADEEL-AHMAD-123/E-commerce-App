const nodeMailer = require("nodemailer");
const createError = require("http-errors");

const sendEmail = async (options) => {
  console.log();
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: "adeeel5598@gmail.com",
      pass: "puztsmjghtvgqxbt",
    },
    debug: true, // Add this option to enable detailed logging
  });

  const mailOptions = {
    from: "adeeel5598@gmail.com",   
    to: options.email, 
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error)
    
  }
};

module.exports = sendEmail;
