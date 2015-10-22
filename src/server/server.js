var express = require("express"),
    globals = require("../build/_globals.js"),
    server = express(),
    liveReload;

if (!globals.isProduction) {
    liveReload = require("connect-livereload");
    server.use(liveReload());
}

server.use("/", express.static("./dist/public")); //relative to package.json
server.use("/src", express.static("./src")); //for development mode & debugging support
server.use("/node_modules", express.static("./node_modules")); //for development mode & debugging support

console.log("acme server is now up...http://localhost:8888");

server.listen(8888);