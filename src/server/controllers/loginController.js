"use strict";

const BaseController = require("./baseController"),
    User = require("../models/userModel"),
    config = require("../config/config"),
    jwt = require("jsonwebtoken");

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

                const token = jwt.sign(authenticated, config.secret, { expiresIn: 86400 });
                super.handleResponse(response, token);
            };

        User.login(credentials, processLogin);
    }
}

module.exports = LoginController;
