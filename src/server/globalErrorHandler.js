"use strict";

let logger = require("./logger");

class GlobalErrorHandler {

    constructor(server) {

        server.use((err, req, res, next) => {
            logger.instance().error(new Date().toJSON(), err.stack);
            console.error(err.stack);
            next(err);
        });

        server.use((err, req, res, next) => {
            res.status(500);
            res.send({ error: "An error occurred.  Please contact the system administrator." });
        });
    }
}

module.exports = GlobalErrorHandler;
