const nodemailer = require('nodemailer')
     const sendEmail = async (email, html) => {
    try {
        const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: 'Recuperação de senha - pipokeeper',
            html: html,
        });

    } catch (error) {
    }
};

module.exports = sendEmail;