"use strict";

const passport = require("passport"),
    BasicStrategy = require("passport-http").BasicStrategy,
    User = require("../models/userModel"),
    encryption = require("../models/encryptionModel");

passport.use(new BasicStrategy(
    (username, password, callback) => {
        User.findOne({ username: username })
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
    }
));

//make sure each API call will have to send credentials
module.exports.authenticate = passport.authenticate("basic", { session: false });


