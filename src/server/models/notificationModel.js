"use strict";

let mailer = require("nodemailer"),
    mailGun = require("nodemailer-mailgun-transport"),
    secureTransporter = require("../config/config").secureTransporter,
    mongoose = require("mongoose"),
    requiredAttr = {type: String, required: true},
    notificationSchema = new mongoose.Schema({
        customer: requiredAttr,
        email: requiredAttr,
        employeeId: {type: String, required: true},
        messages: {
            errors: Array,
            warnings: Array,
            information: Array
        },
        created_at: Date
    });

notificationSchema.pre("save", (next) => {

    if (!this.created_at) {
        this.created_at = new Date();
    }

    next();
});

module.exports = mongoose.model("Notification", notificationSchema);

