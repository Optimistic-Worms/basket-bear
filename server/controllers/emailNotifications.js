const nodemailer = require('nodemailer');

let SMPT_USERNAME = '';
let SMPT_PW = '';

if(process.env.NODE_ENV !== 'test'){
    SMPT_USERNAME = process.env.SMPT_USERNAME;
    SMPT_PW = process.env.SMPT_PW;
}

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
exports.sendMail = () => {

nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: SMPT_USERNAME, // generated ethereal user
            pass: SMPT_PW  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <jason@ilavietnam.edu.vn>', // sender address
        to: 'jason@ilavietnam.edu.vn', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

}