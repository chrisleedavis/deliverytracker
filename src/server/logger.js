"use strict";

let mkdirp = require("mkdirp"),
    logDirectory = "./logs",
    options = {
        logDirectory: logDirectory,
        fileNamePattern: "deliverytracker-<DATE>.log",
        dateFormat: "YYYY.MM.DD"
    },
    instance,
    createInstance = () => {
        mkdirp(logDirectory);
        return require("simple-node-logger").createRollingFileLogger(options);
    };

module.exports = {
    instance: () => {
        if (!instance) {
            instance = createInstance();
        }

        return instance;
    }
};
