const cron = require('node-cron');
const sendEmail = require('./mailer.js');

cron.schedule('0 0 * * *', async()=>{
    const emailSubject = ``;
    const emailText = ``;

    await sendEmail(emailSubject, emailText);
    console.log('Email sent at midnight');
    
})