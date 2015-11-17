"use strict";

const mongoose = require("mongoose"),
    encryption = require("./encryptionModel"),
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

//using function instead of () => to retain execution context
userSchema.statics.login = function(username, password, callback) {
    this.findOne({ username: username })
        .then((user) => {
            if (!user) {
                return callback(null, false);
            }

            encryption.compareHash(password, user.password)
                .then((isMatch) => {
                    return callback(null, isMatch ? user : false);
                })
                .catch((err) => {
                    return callback(err);
                });
        })
        .catch((err) => {
            return callback(err);
        });
};

module.exports = mongoose.model("User", userSchema);
