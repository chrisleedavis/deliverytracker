"use strict";

const BaseController = require("./baseController"),
    User = require("../models/userModel"),
    config = require("../config/config"),
    jwt = require("jsonwebtoken"),
    crypto = require("crypto"),
    algorithm = "aes-256-ctr";

class LoginController extends BaseController {

    constructor() {
        super();
    }

    login(request, response) {

        const credentials = request.body,
            processLogin = (err, authenticated) => {

                if (err || !authenticated) {
                    response.send(401, { d: "Not Authorized" });
                    return;
                }

                //encrypt auth token to hide payload from dev tool users
                const token = jwt.sign(authenticated, config.secret, { expiresIn: 86400 }),
                      cipher = crypto.createCipher(algorithm, config.secret);
                let encryptedToken = cipher.update(token, "utf8", "hex");

                encryptedToken += cipher.final("hex");

                super.handleResponse(response, encryptedToken);
            };

        User.login(credentials, processLogin);
    }
}

module.exports = LoginController;
