"use strict";

let config = require("../config/config"),
    DefaultDb = require("./defaultDb"),
    MongoDb = require("./mongoDb"),
    availableDbs = {
        "default": () => { return new DefaultDb(); },
        "mongo": () => { return new MongoDb(); }
    },
    instance,
    createInstance = () => {
        if (!availableDbs[config.databaseProvider]) {
            throw new TypeError("Db Provider cannot be found: " + config.databaseProvider);
        }

        return availableDbs[config.databaseProvider]();
    };

module.exports = {
    instance: () => {
        if (!instance) {
            instance = createInstance();
        }

        return instance;
    }
};
