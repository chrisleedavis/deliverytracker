"use strict";

const mongoose = require("mongoose"),
    requiredAttr = {type: String, required: true},
    userSchema = new mongoose.Schema({
            username: {
                type: String,
                unique: true,
                required: true
            },
            password: requiredAttr,
            createdBy: requiredAttr
        },
        {
            timestamps: true //get createdAt, updatedAt fields
        });

module.exports = mongoose.model("User", userSchema);
