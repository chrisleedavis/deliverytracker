"use strict";

const express = require("express"),
    globals = require("../../build/_globals"),
    Router = require("./router"),
    GlobalErrorHandler = require("./globalErrorHandler"),
    config = require("./config/config"),
    mongoose = require("mongoose"),
<<<<<<< HEAD
    server = express(),
    registerRouter = () => {
        new Router(express, server);
        new GlobalErrorHandler({ server: server });
        mongoose.Promise = Promise;
        mongoose.connect(config.databaseUrl);
    };
=======
    server = express();

new Router(express, server);
new GlobalErrorHandler({ server: server });
mongoose.Promise = Promise;
mongoose.connect(config.databaseUrl);
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba

if (!globals.isProduction) {
    const liveReload = require("connect-livereload");
    server.use(liveReload());
<<<<<<< HEAD
    registerRouter();
    server.listen(8888);
    console.log("development mode, using liveReload");
=======
    console.log("development mode, using liveReload");
    server.listen(8888);
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba
    console.log("Delivery Tracker server is now up...http://localhost:8888");
} else {
    const fs = require("fs"),
        key = fs.readFileSync("./src/server/config/deliverytracker-key.pem"),
        cert = fs.readFileSync("./src/server/config/deliverytracker-cert.pem"),
        https = require("https");

<<<<<<< HEAD
    registerRouter();
=======
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba
    https.createServer({ key: key, cert: cert}, server).listen(process.env.PORT || 8888);
    console.log("Delivery Tracker server is now up...https://localhost:8888");
}



<<<<<<< HEAD




=======
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba
