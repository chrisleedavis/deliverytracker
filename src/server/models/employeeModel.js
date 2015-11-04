"use strict";

let mongoose = require("mongoose"),
    requiredAttr = {type: String, required: true},
    employeeSchema = new mongoose.Schema({
            employeeNumber: {
                type: String,
                unique: true,
                required: true
            },
            firstName: requiredAttr,
            lastName: requiredAttr,
            image: requiredAttr
        },
        {
            timestamps: true //get createdAt, updatedAt fields
        });

module.exports = mongoose.model("Employee", employeeSchema);
