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
                user.createdBy = request.user._id;
                user.save()
                    .then((u) => {
                        super.handleResponse(response, u);
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

        User.find({}).exec()
            .then((users) => {
                super.handleResponse(response, users);
            })
            .catch((err) => {
                super.handleError(response, err);
            });
    }
}

module.exports = UsersController;

