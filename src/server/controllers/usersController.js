"use strict";

const BaseController = require("./baseController"),
    User = require("../models/userModel"),
    encryption = require("../models/encryptionModel");

class UsersController extends BaseController {

    constructor() {
        super();
    }

    addUser(request, response) {

        const user = new User(request.body);

        encryption.encryptText(user.password)
            .then((encryptedPassword) => {
                user.password = encryptedPassword;
                user.save()
                    .then((u) => {
                        const encryptedToken = encryption.encryptToken(u);
                        super.handleResponse(response, encryptedToken);
                    })
                    .catch((err) => {
                        super.handleError(response, err);
                    });
            })
            .catch((err) => {
                super.handleError(response, err);
            });
    }

    findAllUsers(request, response) {

        super.findAll(request, response, User);
    }
}

module.exports = UsersController;

