"use strict";

describe("Router Tests", () => {

    let mockery = require("mockery"),
        configQueue;

    beforeEach(() => {

        configQueue = [];

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        //mock out dependencies
        mockery.registerMock("passport", {
            initialize: () => {
                return "passport initialized";
            }
        });
        mockery.registerMock("./controllers/authenticationController",
            {
                authenticate: () => {}
            });
        mockery.registerMock("./controllers/employeesController",
            class {
                addEmployee(request, response) {}
                findAllEmployees(request, response) {}
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

        //mock out body-parser for verifying calls only
        mockery.registerMock("body-parser", {
            json: (config) => {
                configQueue.push(config);
                return "json being used";
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
                        post () {
                            const args = arguments;

                            if (args.length === 2) {
                                configQueue.push("auth: " + args[0]);
                                configQueue.push("post: " + args[1]);
                            } else {
                                configQueue.push("post: " + args[0]);
                            }
                            return this;
                        }
                        get (auth, config) { configQueue.push("auth: " + auth); configQueue.push("get: " + config); return this; }
                    };

                    return new Pipe();
                }
            },
            router = new Router(express, server);

        expect(configQueue.length).toEqual(29);
        expect(configQueue[0]).toEqual("passport initialized");
        expect(configQueue[1]).toEqual("./dist");
        expect(configQueue[2]).toEqual("/");
        expect(configQueue[3]).toEqual("./src");
        expect(configQueue[4]).toEqual("/src");
        expect(configQueue[5]).toEqual("./node_modules");
        expect(configQueue[6]).toEqual("/node_modules");
        expect(configQueue[7]).toEqual({  });
        expect(configQueue[8]).toEqual("json being used");
        expect(configQueue[9]).toEqual("route: /api/employees");
        expect(configQueue[10]).toEqual("auth: () => {}");
        expect(configQueue[11]).toEqual("post: addEmployee(request, response) {}");
        expect(configQueue[12]).toEqual("auth: () => {}");
        expect(configQueue[13]).toEqual("get: findAllEmployees(request, response) {}");
        expect(configQueue[14]).toEqual("route: /api/notifications");
        expect(configQueue[15]).toEqual("auth: () => {}");
        expect(configQueue[16]).toEqual("post: sendNotification(request, response) {}");
        expect(configQueue[17]).toEqual("auth: () => {}");
        expect(configQueue[18]).toEqual("get: findAllNotifications(request, response) {}");
        expect(configQueue[19]).toEqual("route: /api/users");
        expect(configQueue[20]).toEqual("auth: () => {}");
        expect(configQueue[21]).toEqual("post: addUser(request, response) {}");
        expect(configQueue[22]).toEqual("auth: () => {}");
        expect(configQueue[23]).toEqual("get: findAllUsers(request, response) {}");
        expect(configQueue[24]).toEqual("route: /api/logs");
        expect(configQueue[25]).toEqual("auth: () => {}");
        expect(configQueue[26]).toEqual("post: addLog(request, response) {}");
        expect(configQueue[27]).toEqual("route: /api/login");
        expect(configQueue[28]).toEqual("post: login(request, response) {}");
    });

});
