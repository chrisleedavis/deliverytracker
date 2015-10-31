"use strict";

let EmployeesController = require("./controllers/employeesController"),
    employees = new EmployeesController(),
    NotificationsController = require("./controllers/notificationsController"),
    notifications = new NotificationsController(),
    bodyParser = require("body-parser");

const EMPLOYEE_API_ROOT = "/api/employees",
      EMPLOYEE_API_ROOT_ID = "/api/employees/:id",
      NOTIFICATION_API_ROOT = "/api/notifications";

class Router {

    constructor(express, server) {
        server.use("/", express.static("./dist")); //relative to package.json
        server.use("/src", express.static("./src")); //for development mode & debugging support
        server.use("/node_modules", express.static("./node_modules")); //for development mode & debugging support

        // parse application/json
        server.use(bodyParser.json());

        // parse application/vnd.api+json as json
        server.use(bodyParser.json({ type: "application/vnd.api+json" }));

        //web api routing, CRUD = POST|GET|PUT|DELETE
        server.post(EMPLOYEE_API_ROOT, employees.addEmployee);
        server.get(EMPLOYEE_API_ROOT, employees.findAllEmployees);

        server.post(NOTIFICATION_API_ROOT, notifications.sendNotification);
        server.get(NOTIFICATION_API_ROOT, notifications.findAllNotifications);
    }
}

module.exports = Router;
