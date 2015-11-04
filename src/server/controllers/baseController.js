"use strict";

let _ = require("lodash"),
    logger = require("../logger"),
    responseHelper = require("./responseHelper");

const VALIDATION_ERROR = "ValidationError",
      ERROR_RESPONSE = { error: "An error occurred.  Please contact the system administrator." };

class BaseController {

    constructor() {
        if (this.constructor === BaseController) {
            throw new TypeError("BaseController is an abstract class and cannot be instantiated directly");
        }
    }

    handleError(response, err) {

        let errorResponse = ERROR_RESPONSE,
            parseValidationError = (err) => {
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
}

module.exports = BaseController;
