"use strict";

describe("Authentication Controller Tests", () => {

    const mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache");

    let authQueue,
        basicStrategy;

    beforeEach(() => {

        authQueue = [];

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("passport", {
            use: (strategy) => {
                basicStrategy = strategy;
            },
            authenticate: (type, options) => {
                authQueue.push(type);
                authQueue.push(options);
            }
        });

        mockery.registerMock("passport-http", {
            BasicStrategy: class {
                constructor(cb) {
                    cb("fooUser", "barPassword", "testCallback");
                }
            }
        });

        mockery.registerMock("../models/userModel", {
            login: (username, password, callback) => {
                authQueue.push(username);
                authQueue.push(password);
                authQueue.push(callback);
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should instantiate the BasicStrategy properly with passport", () => {

        const authenticationController = require("./authenticationController");

        expect(authQueue).toEqual([ "fooUser", "barPassword", "testCallback", "basic", Object({ session: false }) ]);
    });

});
