"use strict";

const bodyParser = require("body-parser"),
    passport = require("passport"),
    authentication = require("./controllers/authenticationController"),
    EmployeesController = require("./controllers/employeesController"),
    employees = new EmployeesController(),
    EMPLOYEE_API_ROOT = "/api/employees",
    NotificationsController = require("./controllers/notificationsController"),
    notifications = new NotificationsController(),
    NOTIFICATION_API_ROOT = "/api/notifications",
    UsersController = require("./controllers/usersController"),
    users = new UsersController(),
    USER_API_ROOT = "/api/users";

class Router {

    constructor(express, server) {

        server.use(passport.initialize());

        server.use("/", express.static("./dist")); //relative to package.json
        server.use("/src", express.static("./src")); //for development mode & debugging support
        server.use("/node_modules", express.static("./node_modules")); //for development mode & debugging support

        server.use(bodyParser.json({}));

        //web api routing, CRUD = POST|GET|PUT|DELETE
        server.route(EMPLOYEE_API_ROOT)
            .post(authentication.authenticate, employees.addEmployee)
            .get(authentication.authenticate, employees.findAllEmployees);

        server.route(NOTIFICATION_API_ROOT)
            .post(authentication.authenticate, notifications.sendNotification)
            .get(authentication.authenticate, notifications.findAllNotifications);

        server.route(USER_API_ROOT)
            .post(authentication.authenticate, users.addUser)
            .get(authentication.authenticate, users.findAllUsers);
    }
}

module.exports = Router;
