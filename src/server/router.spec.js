"use strict";

describe("Router Tests", () => {

    let mockery = require("mockery"),
        configQueue,
        jwtConfig;

    beforeEach(() => {

        configQueue = [];

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        //mock out dependencies
        mockery.registerMock("./controllers/employeesController",
            class {
                addEmployee(request, response) {}
                findAllEmployees(request, response) {}
            });
        mockery.registerMock("./controllers/routesController",
            class {
                addRoute(request, response) {}
                findAllRoutes(request, response) {}
            });
        mockery.registerMock("./controllers/notificationsController",
            class {
                sendNotification(request, response) {}
                findAllNotifications(request, response) {}
            });
        mockery.registerMock("./controllers/usersController",
            class {
                addUser(request, response) {}
                findAllUsers(request, response) {}
            });
        mockery.registerMock("./controllers/logsController",
            class {
                addLog(request, response) {}
            });
        mockery.registerMock("./controllers/loginController",
            class {
                login(request, response) {}
            });
        mockery.registerMock("express-jwt",
            (config) => {
               jwtConfig = config;
            });

        mockery.registerMock("./config/config", { secret: "BlahTest" });

        //mock out body-parser for verifying calls only
        mockery.registerMock("body-parser", {
            json: (config) => {
                configQueue.push(config);
                return "json being used";
            },
            urlencoded: (config) => {
                configQueue.push(config);
                return "urlencoded being used";
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should configure router properly", () => {
        let Router = require("./router"),
            express = { "static": (config) => { configQueue.push(config); }},
            server = {
                use: (config) => { configQueue.push(config); },
                route: (config) => {
                    configQueue.push("route: " + config);

                    let Pipe = class {
                        post (config) { configQueue.push("post: " + config); return this; }
                        get (config) { configQueue.push("get: " + config); return this; }
                    };

                    return new Pipe();
                }
            },
            router = new Router(express, server);

        expect(configQueue.length).toEqual(28);
        expect(configQueue[0]).toEqual("./dist");
        expect(configQueue[1]).toEqual("/");
        expect(configQueue[2]).toEqual("./src");
        expect(configQueue[3]).toEqual("/src");
        expect(configQueue[4]).toEqual("./node_modules");
        expect(configQueue[5]).toEqual("/node_modules");
        expect(configQueue[6]).toEqual("/api");
        expect(configQueue[7]).toEqual("./dist/index.html");
        expect(configQueue[8]).toEqual("/di/*");
        expect(configQueue[9]).toEqual({  });
        expect(configQueue[10]).toEqual("json being used");
        expect(configQueue[11]).toEqual({ extended: false });
        expect(configQueue[12]).toEqual("urlencoded being used");
        expect(configQueue[13]).toEqual("route: /api/employees");
        expect(configQueue[14]).toEqual("post: addEmployee(request, response) {}");
        expect(configQueue[15]).toEqual("get: findAllEmployees(request, response) {}");
        expect(configQueue[16]).toEqual("route: /api/notifications");
        expect(configQueue[17]).toEqual("post: sendNotification(request, response) {}");
        expect(configQueue[18]).toEqual("get: findAllNotifications(request, response) {}");
        expect(configQueue[19]).toEqual("route: /api/logs");
        expect(configQueue[20]).toEqual("post: addLog(request, response) {}");
        expect(configQueue[21]).toEqual("route: /api/routes");
        expect(configQueue[22]).toEqual("post: addRoute(request, response) {}");
        expect(configQueue[23]).toEqual("get: findAllRoutes(request, response) {}");
        expect(configQueue[24]).toEqual("route: /login");
        expect(configQueue[25]).toEqual("post: login(request, response) {}");
        expect(configQueue[26]).toEqual("route: /users");
        expect(configQueue[27]).toEqual("post: addUser(request, response) {}");
    });

    it("should handle jwt security properly if no auth token is provided", () => {
        const request = { headers: {} },
            token = jwtConfig.getToken(request);

        expect(token).toBeNull();
    });

    it("should handle jwt security properly if auth token is provided", () => {
        const crypto = require("crypto"),
            algorithm = "aes-256-ctr",
            clearToken = "woo hoo mate!",
            config = require("./config/config"),
            cipher = crypto.createCipher(algorithm, config.secret);

        let encryptedToken = cipher.update(clearToken, "utf8", "hex"),
            request = { headers: {} },
            token;

        encryptedToken += cipher.final("hex");
        request.headers.authorization = "Bearer " + encryptedToken;
        token = jwtConfig.getToken(request);

        expect(token).not.toBeNull();
        expect(token).toEqual(clearToken);
    });
});
