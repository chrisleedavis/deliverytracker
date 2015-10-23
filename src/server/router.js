let EMPLOYEE_API_ROOT = "/api/employees",
    EMPLOYEE_API_ROOT_ID = "/api/employees/:id",
    EmployeesController = require("./controllers/employeesController"),
    employees = new EmployeesController(),
    NOTIFICATION_API_ROOT = "/api/notifications",
    NotificationsController = require("./controllers/notificationsController"),
    notifications = new NotificationsController(),
    bodyParser = require("body-parser");

class Router {

    init(express, server) {
        server.use("/", express.static("./dist/public")); //relative to package.json
        server.use("/src", express.static("./src")); //for development mode & debugging support
        server.use("/node_modules", express.static("./node_modules")); //for development mode & debugging support

        // parse application/json
        server.use(bodyParser.json());

        // parse application/vnd.api+json as json
        server.use(bodyParser.json({ type: "application/vnd.api+json" }));

        //web api routing, CRUD = POST|GET|PUT|DELETE
        server.post(EMPLOYEE_API_ROOT, employees.addEmployee);
        server.get(EMPLOYEE_API_ROOT, employees.findAllEmployees);
        server.get(EMPLOYEE_API_ROOT_ID, employees.findEmployee);
        server.put(EMPLOYEE_API_ROOT_ID, employees.updateEmployee);
        server.delete(EMPLOYEE_API_ROOT_ID, employees.deleteEmployee);

        server.post(NOTIFICATION_API_ROOT, notifications.sendNotification);
    }
}

module.exports = Router;
