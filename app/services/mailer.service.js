let nodemailer = require('nodemailer');
const templateService = require('../services/template.service');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "virajwalavalkar525@gmail.com",
        pass: "Viraj@123",
        // user: process.env.PTP_EMAIL,
        // pass: process.env.PTP_EMAIL_PASSWORD
    }
});

async function sendDM(user, mailType) {

    try {
        console.log('Calling Mailer service with payload ', JSON.stringify(user));

        const mail = await transporter.sendMail({
            from: "virajwalavalkar525@gmail.com",
            to: "bhushanvijaymane@gmail.com",
            subject: " hello lavdy",
            text: "Cr chutyia",
        });




        const opts = templateService.getEmailOpts(user, mailType);

        const data = await transporter.sendMail(opts);

        return { success: true, message: 'Email sent.', data: data }
    } catch (err) {
        console.log(err);
        return { success: false, message: 'Email service not working.', error: err }
    }
}

exports.sendDM = sendDM;