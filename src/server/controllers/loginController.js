"use strict";

const BaseController = require("./baseController"),
    User = require("../models/userModel"),
<<<<<<< HEAD
    encryption = require("../models/encryptionModel");
=======
    config = require("../config/config"),
    jwt = require("jsonwebtoken"),
    crypto = require("crypto"),
    algorithm = "aes-256-ctr";
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba

class LoginController extends BaseController {

    constructor() {
        super();
    }

    login(request, response) {

        const credentials = request.body,
<<<<<<< HEAD
            processLogin = (err, user) => {

                if (err || !user) {
=======
            processLogin = (err, authenticated) => {

                if (err || !authenticated) {
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba
                    response.send(401, { d: "Not Authorized" });
                    return;
                }

<<<<<<< HEAD
                const encryptedToken = encryption.encryptToken(user);
=======
                //encrypt auth token to hide payload from dev tool users
                const token = jwt.sign(authenticated, config.secret, { expiresIn: 86400 }),
                      cipher = crypto.createCipher(algorithm, config.secret);
                let encryptedToken = cipher.update(token, "utf8", "hex");

                encryptedToken += cipher.final("hex");
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba

                super.handleResponse(response, encryptedToken);
            };

        User.login(credentials, processLogin);
    }
}

module.exports = LoginController;
