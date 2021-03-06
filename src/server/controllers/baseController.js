"use strict";

const _ = require("lodash"),
    logger = require("../logger"),
    responseHelper = require("./responseHelper"),
    VALIDATION_ERROR = "ValidationError",
    ERROR_RESPONSE = { error: "An error occurred.  Please contact the system administrator." };

let self;

class BaseController {

    constructor() {
        if (this.constructor === BaseController) {
            throw new TypeError("BaseController is an abstract class and cannot be instantiated directly");
        }

        self = this;
    }

    handleError(response, err) {

        let errorResponse = ERROR_RESPONSE;
        const parseValidationError = (err) => {
                let errorResponse = {
                    error: "Validation error occurred",
                    errors: []
                };

                _.each(_.keys(err.errors), (key) => {
                    errorResponse.errors.push(err.errors[key].message);
                });

                return errorResponse;
            };

        if (err.name === VALIDATION_ERROR) {
            errorResponse = parseValidationError(err);
        }

        logger.instance().error(new Date().toJSON(), err.stack);
        responseHelper.sendResponse(response, errorResponse);
    }

    handleResponse(response, data) {

        responseHelper.sendResponse(response, data);
    }

    findAll(request, response, model) {

        model.find({}).exec()
            .then((data) => {
                self.handleResponse(response, data);
            })
            .catch((err) => {
                self.handleError(response, err);
            });
    }
}

module.exports = BaseController;
