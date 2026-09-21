const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {

    const transporter = nodemailer.createTransport({

        service: "Gmail",

        auth: {
            user: "eshantharjun9@gmail.com",
            pass: "znue ucqo tvlx xpth"
        }

    });

    const mailOptions = {

        from: "eshantharjun9@gmail.com",
        to,
        subject,
        text

    };

    await transporter.sendMail(mailOptions);

};

module.exports = { sendEmail };