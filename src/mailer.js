const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vatsalmangukiya9003@gmail.com',
        pass:'TOBEPROVIDED'
    }
});

const sendEmail = async(subject , text) =>{
    try{
        await transporter.sendMail({
            from: `"Vatsal Mangukiya" <vatsalmangukiya9003@gmail.com>`,
            to: '20bmiit076@gmail.com',
            subject: subject,
            text:text,
        });
        console.log('Email sent successfully');

    } catch (error) {
        console.error('Error sending email: ', error);

    }
}

module.exports = sendEmail;