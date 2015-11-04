"use strict";

let mailer = require("nodemailer"),
    mailGun = require("nodemailer-mailgun-transport"),
    secureTransporter = require("../config/config").secureTransporter;

class Mailer {

    sendNotification(notification, employee) {

        let transporter = mailer.createTransport(mailGun(secureTransporter.auth)),
            mailOptions = {
                from: secureTransporter.sender,
                to: notification.email,
                subject: "Delivery Notice",
                text: "You have a delivery today.",
                html: '<b>You have a delivery today.</b><img src="' + employee.image + '" alt="Delivery Person" width="150" height="150" />'
            };

        transporter.sendMail(mailOptions, (error, info) => {

            if(error){
                notification.messages.errors.push(error);
            }

            notification.messages.information.push(info.response);

        });
    }
}

module.exports = Mailer;
