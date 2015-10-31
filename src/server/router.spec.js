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

        //mock out controllers for dbFactory hijacking
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

        //mock out body-parser for verifying calls only
        mockery.registerMock("body-parser", {
            json: (config) => {
                if (!config) {
                    configQueue.push("set default json");
                } else {
                    configQueue.push(config);
                }

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
                post: (config) => { configQueue.push("post: " + config); },
                get: (config) => { configQueue.push("get: " + config); }
            },
            router = new Router(express, server);

        expect(configQueue.length).toEqual(14);
        expect(configQueue[0]).toEqual("./dist");
        expect(configQueue[1]).toEqual("/");
        expect(configQueue[2]).toEqual("./src");
        expect(configQueue[3]).toEqual("/src");
        expect(configQueue[4]).toEqual("./node_modules");
        expect(configQueue[5]).toEqual("/node_modules");
        expect(configQueue[6]).toEqual("set default json");
        expect(configQueue[7]).toEqual("json being used");
        expect(configQueue[8]).toEqual({ type: 'application/vnd.api+json' });
        expect(configQueue[9]).toEqual("json being used");
        expect(configQueue[10]).toEqual("post: /api/employees");
        expect(configQueue[11]).toEqual("get: /api/employees");
        expect(configQueue[12]).toEqual("post: /api/notifications");
        expect(configQueue[13]).toEqual("get: /api/notifications");
    });

});
