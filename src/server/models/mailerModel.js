"use strict";

const mailer = require("nodemailer"),
    mailGun = require("nodemailer-mailgun-transport"),
    secureTransporter = require("../config/config").secureTransporter,
    globals = require("../../../build/_globals.js"),
    mailOptions = require("../../../theme/" + globals.theme + "/mailOptions");

class Mailer {

    sendNotification(notification, employee) {

        const transporter = mailer.createTransport(mailGun(secureTransporter.auth)),
            options = {
                from: secureTransporter.sender,
                to: notification.email,
                subject: mailOptions.subject,
                text: "",
                html: mailOptions.getHtml(employee)
            };

        transporter.sendMail(options, (error, info) => {

            if(error){
                notification.messages.errors.push(error);
            }

            notification.messages.information.push(info.response);

        });
    }
}

module.exports = Mailer;
