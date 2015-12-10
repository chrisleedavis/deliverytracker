"use strict";

const bodyParser = require("body-parser"),
    expressJwt = require("express-jwt"),
    config = require("./config/config"),
    employees = new (require("./controllers/employeesController"))(),
    routes = new (require("./controllers/routesController"))(),
    notifications = new (require("./controllers/notificationsController"))(),
    users = new (require("./controllers/usersController"))(),
    logs = new (require("./controllers/logsController"))(),
    login = new (require("./controllers/loginController"))(),
    crypto = require("crypto"),
    algorithm = "aes-256-ctr",
    jwtConfig = { secret: config.secret,
                  getToken: (req) => {

                      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
                          const encryptedToken = req.headers.authorization.split(" ")[1],
                                decipher = crypto.createDecipher(algorithm, config.secret);
                          let decryptedToken = decipher.update(encryptedToken, "hex", "utf8");

                          decryptedToken += decipher.final("utf8");

                          return decryptedToken;
                      }

                      return null;
                }};

class Router {

    constructor(express, server) {

        server.use("/", express.static("./dist")); //relative to package.json
        server.use("/src", express.static("./src")); //for development mode & debugging support
        server.use("/node_modules", express.static("./node_modules")); //for development mode & debugging support

        //provide security around api & provide support for html5 routing
        server.use("/api", expressJwt(jwtConfig));
        server.use("/di/*", express.static("./dist/index.html"));

        server.use(bodyParser.json({}));
        server.use(bodyParser.urlencoded({extended: false}));

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

        server.route("/api/routes")
            .post(routes.addRoute)
            .get(routes.findAllRoutes);

        server.route("/login")
            .post(login.login);
    }
}

module.exports = Router;
