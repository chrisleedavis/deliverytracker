"use strict";

const passport = require("passport"),
    BasicStrategy = require("passport-http").BasicStrategy,
    User = require("../models/userModel");

passport.use(new BasicStrategy(
    (username, password, callback) => {
        return User.login(username, password, callback);
    }
));

//make sure each API call will have to send credentials
module.exports.authenticate = passport.authenticate("basic", { session: false });


