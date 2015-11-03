"use strict";

let EmployeesController = require("./controllers/employeesController"),
    employees = new EmployeesController(),
    NotificationsController = require("./controllers/notificationsController"),
    notifications = new NotificationsController(),
    bodyParser = require("body-parser");

const EMPLOYEE_API_ROOT = "/api/employees",
      NOTIFICATION_API_ROOT = "/api/notifications";

class Router {

    constructor(express, server) {
        server.use("/", express.static("./dist")); //relative to package.json
        server.use("/src", express.static("./src")); //for development mode & debugging support
        server.use("/node_modules", express.static("./node_modules")); //for development mode & debugging support

        server.use(bodyParser.json({}));

        //web api routing, CRUD = POST|GET|PUT|DELETE
        server.route(EMPLOYEE_API_ROOT)
            .post(employees.addEmployee)
            .get(employees.findAllEmployees);

        server.route(NOTIFICATION_API_ROOT)
            .post(notifications.sendNotification)
            .get(notifications.findAllNotifications);
    }
}

module.exports = Router;
