
const nodemailer = require('nodemailer');

const SendMessage = async (email, username, token) => {
    // dikirmkan ke email
    // ? => menandakan sebuah GET
    const msg = `
    <p>Hello ${username}</p>
    <p>We're glad you've joined our movie app</p>
    <p>Veritify you account</p>
    <button><a href='http://localhost:${process.env.PORT}/auth/verify?token=${token}'>Click Here</a></button>
  `;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = SendMessage;