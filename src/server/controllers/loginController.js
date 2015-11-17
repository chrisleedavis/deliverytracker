"use strict";

const BaseController = require("./baseController"),
    User = require("../models/userModel");

class LoginController extends BaseController {

    constructor() {
        super();
    }

    login(request, response) {

        const credentials = request.body,
            processLogin = (err, authenticated) => {

                if (err) {
                    super.handleError(response, err);
                } else {
                    super.handleResponse(response, authenticated);
                }
            };

        User.login(credentials, processLogin);
    }
}

module.exports = LoginController;
