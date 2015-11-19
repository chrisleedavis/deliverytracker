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

        expect(configQueue.length).toEqual(24);
        expect(configQueue[0]).toEqual("./dist");
        expect(configQueue[1]).toEqual("/");
        expect(configQueue[2]).toEqual("./src");
        expect(configQueue[3]).toEqual("/src");
        expect(configQueue[4]).toEqual("./node_modules");
        expect(configQueue[5]).toEqual("/node_modules");
        expect(configQueue[6]).toEqual({  });
        expect(configQueue[7]).toEqual("json being used");
        expect(configQueue[8]).toEqual({ extended: false });
        expect(configQueue[9]).toEqual("urlencoded being used");
        expect(configQueue[10]).toEqual("/api");
        expect(configQueue[11]).toEqual("route: /api/employees");
        expect(configQueue[12]).toEqual("post: addEmployee(request, response) {}");
        expect(configQueue[13]).toEqual("get: findAllEmployees(request, response) {}");
        expect(configQueue[14]).toEqual("route: /api/notifications");
        expect(configQueue[15]).toEqual("post: sendNotification(request, response) {}");
        expect(configQueue[16]).toEqual("get: findAllNotifications(request, response) {}");
        expect(configQueue[17]).toEqual("route: /api/users");
        expect(configQueue[18]).toEqual("post: addUser(request, response) {}");
        expect(configQueue[19]).toEqual("get: findAllUsers(request, response) {}");
        expect(configQueue[20]).toEqual("route: /api/logs");
        expect(configQueue[21]).toEqual("post: addLog(request, response) {}");
        expect(configQueue[22]).toEqual("route: /login");
        expect(configQueue[23]).toEqual("post: login(request, response) {}");
    });

});
