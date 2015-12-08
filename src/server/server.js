"use strict";

const express = require("express"),
    globals = require("../../build/_globals"),
    Router = require("./router"),
    GlobalErrorHandler = require("./globalErrorHandler"),
    config = require("./config/config"),
    mongoose = require("mongoose"),
    server = express();

new Router(express, server);
new GlobalErrorHandler({ server: server });
mongoose.Promise = Promise;
mongoose.connect(config.databaseUrl);

if (!globals.isProduction) {
    const liveReload = require("connect-livereload");
    server.use(liveReload());
    console.log("development mode, using liveReload");
    server.listen(8888);
    console.log("Delivery Tracker server is now up...http://localhost:8888");
} else {
    const fs = require("fs"),
        key = fs.readFileSync("./src/server/config/deliverytracker-key.pem"),
        cert = fs.readFileSync("./src/server/config/deliverytracker-cert.pem"),
        https = require("https");

    https.createServer({ key: key, cert: cert}, server).listen(process.env.PORT || 8888);
    console.log("Delivery Tracker server is now up...https://localhost:8888");
}



