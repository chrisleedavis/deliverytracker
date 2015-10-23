let mailer = require("nodemailer"),
    mailGun = require("nodemailer-mailgun-transport"),
    SecureTransporter = require("./secureTransporterModel");

class Notification {

    constructor(data) {
        this.customer = data.customer;
        this.email = data.email;
        this.employeeId = data.employeeId;
    }

    sendNotification(employee) {
        console.log("notification sent");

        //todo: will never work reliably...mail services block images or run images through proxy for protection
        let secureTransporter = new SecureTransporter(),
            transporter = mailer.createTransport(mailGun(secureTransporter.auth)),
            mailOptions = {
                from: secureTransporter.sender,
                to: this.email,
                subject: "Delivery Notice",
                text: "You have a delivery today.",
                html: '<b>You have a delivery today.</b><img src="' + employee.image + '" alt="Delivery Person" width="150" height="150" />'
            };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log("Message sent: " + info.response);

        });
    }
}

module.exports = Notification;

