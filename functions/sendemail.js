require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    const { name, email, message } = JSON.parse(event.body);
    const attachment = event.files?.attachment;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Email configuration error' }) };
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${name}`,
        text: message,
        attachments: attachment ? [{ path: attachment.path }] : []
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: JSON.stringify({ message: 'Email sent successfully!' }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Error sending email', error: error.message }) };
    }
};
