"use strict";

let express = require("express"),
    globals = require("../../build/_globals"),
    Router = require("./router"),
    GlobalErrorHandler = require("./globalErrorHandler"),
    server = express();

new Router(express, server);
new GlobalErrorHandler(server);

if (!globals.isProduction) {
    let liveReload = require("connect-livereload");
    server.use(liveReload());
    console.log("development mode, using liveReload");
    server.listen(8888);
    console.log("Delivery Tracker server is now up...http://localhost:8888");
} else {
    let fs = require("fs"),
        key = fs.readFileSync("./src/server/config/deliverytracker-key.pem"),
        cert = fs.readFileSync("./src/server/config/deliverytracker-cert.pem"),
        https = require("https");

    https.createServer({ key: key, cert: cert}, server).listen(process.env.PORT || 8888);
    console.log("Delivery Tracker server is now up...https://localhost:8888");
}



