"use strict";

const BaseController = require("./baseController"),
    logger = require("../logger");

class LogsController extends BaseController {

    constructor() {
        super();
    }

    addLog(request, response) {

        const error = request.body;

        logger.instance().error(new Date().toJSON(), error.stack);
        console.error(error.stack);

        super.handleResponse(response, error);
    }
}

module.exports = LogsController;

