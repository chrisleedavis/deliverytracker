"use strict";

let express = require("express"),
    globals = require("../../build/_globals"),
    Router = require("./router"),
    GlobalErrorHandler = require("./globalErrorHandler"),
    server = express();

if (!globals.isProduction) {
    let liveReload = require("connect-livereload");
    server.use(liveReload());
    console.log("development mode, using liveReload");
}

new Router(express, server);
new GlobalErrorHandler(server);

console.log("Delivery Tracker server is now up...http://localhost:8888");

server.listen(8888);