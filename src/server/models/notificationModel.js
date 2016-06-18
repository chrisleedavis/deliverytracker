"use strict";

const mongoose = require("mongoose"),
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
            createdBy: requiredAttr
        },
        {
           timestamps: true //get createdAt, updatedAt fields
        });

module.exports = mongoose.model("Notification", notificationSchema);

