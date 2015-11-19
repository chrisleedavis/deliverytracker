"use strict";

const bodyParser = require("body-parser"),
    expressJwt = require("express-jwt"),
    config = require("./config/config"),
    employees = new (require("./controllers/employeesController"))(),
    notifications = new (require("./controllers/notificationsController"))(),
    users = new (require("./controllers/usersController"))(),
    logs = new (require("./controllers/logsController"))(),
    login = new (require("./controllers/loginController"))();

class Router {

    constructor(express, server) {

        server.use("/", express.static("./dist")); //relative to package.json
        server.use("/src", express.static("./src")); //for development mode & debugging support
        server.use("/node_modules", express.static("./node_modules")); //for development mode & debugging support

        server.use(bodyParser.json({}));
        server.use(bodyParser.urlencoded({extended: false}));
        server.use("/api", expressJwt({secret: config.secret}));

        //web api routing, CRUD = POST|GET|PUT|DELETE
        server.route("/api/employees")
            .post(employees.addEmployee)
            .get(employees.findAllEmployees);

        server.route("/api/notifications")
            .post(notifications.sendNotification)
            .get(notifications.findAllNotifications);

        server.route("/api/users")
            .post(users.addUser)
            .get(users.findAllUsers);

        server.route("/api/logs")
            .post(logs.addLog);

        server.route("/login")
            .post(login.login);
    }
}

module.exports = Router;
