"use strict";

let mailer = require("nodemailer"),
    mailGun = require("nodemailer-mailgun-transport"),
    secureTransporter = require("../config/config").secureTransporter,
    messages = { errors: [], warnings: [], information: []};

class Notification {

    constructor(data) {
        this.customer = data.customer;
        this.email = data.email;
        this.employeeId = data.employeeId;
        this.messages = messages;
        this.date = new Date();
    }

    sendNotification(employee) {

        let transporter = mailer.createTransport(mailGun(secureTransporter.auth)),
            mailOptions = {
                from: secureTransporter.sender,
                to: this.email,
                subject: "Delivery Notice",
                text: "You have a delivery today.",
                html: '<b>You have a delivery today.</b><img src="' + employee.image + '" alt="Delivery Person" width="150" height="150" />'
            };

        transporter.sendMail(mailOptions, (error, info) => {

            if(error){
                messages.errors.push(error);
            }

            messages.information.push(info.response);

        });
    }
}

module.exports = Notification;

