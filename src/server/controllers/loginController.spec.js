"use strict";

describe("Login Controller Tests", () => {

    let _ = require("lodash"),
        mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache"),
        loginQueue;

    beforeEach(() => {

        loginQueue = [];

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../models/userModel", class {

            static login(credentials, callback) {

                const err = "YOU BARRED THIS FOO";

                if (!credentials.username) {
                    callback(err);
                } else {
                    callback(null, credentials.password === "testMe");
                }
            }
        });

        mockery.registerMock("../logger", {
            instance: () => {
                return {
                    error: _.noop
                };
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should handle login properly when login successful", () => {
        let LoginController = require("./loginController"),
            login = new LoginController(),
            request = { body: { username: "fooBar", password: "testMe" } },
            response = { send: function(data) { loginQueue.push(data); } };

        login.login(request, response);

        expect(loginQueue.length).toEqual(1);
        expect(loginQueue[0].d).toBeTruthy();
    });

    it("should handle login properly when login failed", () => {
        let LoginController = require("./loginController"),
            login = new LoginController(),
            request = { body: { password: "testMe" } },
            response = { send: function(data) { loginQueue.push(data); } };

        login.login(request, response);

        expect(loginQueue.length).toEqual(1);
        expect(loginQueue[0].d).toEqual({ error: "An error occurred.  Please contact the system administrator." });
    });

});
