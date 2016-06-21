"use strict";

const BaseController = require("./baseController"),
    User = require("../models/userModel"),
    encryption = require("../models/encryptionModel");

class LoginController extends BaseController {

    constructor() {
        super();
    }

    login(request, response) {

        const credentials = request.body,
            processLogin = (err, user) => {

                if (err || !user) {
                    response.send(401, { d: "Not Authorized" });
                    return;
                }
                
                const encryptedToken = encryption.encryptToken(user);
                super.handleResponse(response, encryptedToken);
            };

        User.login(credentials, processLogin);
    }
}

module.exports = LoginController;
