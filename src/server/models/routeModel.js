"use strict";

const mongoose = require("mongoose"),
    requiredAttr = {type: String, required: true},
    routeSchema = new mongoose.Schema({
            routeNumber: {
                type: String,
                unique: true,
                required: true
            },
            employeeId: requiredAttr,
            createdBy: requiredAttr
        },
        {
            timestamps: true //get createdAt, updatedAt fields
        });

module.exports = mongoose.model("Route", routeSchema);

