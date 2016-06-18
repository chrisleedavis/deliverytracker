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

        mockery.registerMock("../config/config", { secret: "BlahTest" });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should handle login properly when login successful", () => {
        let login = new (require("./loginController"))(),
            request = { body: { username: "fooBar", password: "testMe" } },
            response = { send: (data) => { loginQueue.push(data); } };

        login.login(request, response);

        expect(loginQueue.length).toEqual(1);
        expect(loginQueue[0].d).toBeTruthy();
    });

    it("should handle login properly when login failed", () => {
        let login = new (require("./loginController"))(),
            request = { body: { password: "testMe" } },
            response = { send: (code, data) => { loginQueue.push(code); loginQueue.push(data); } };

        login.login(request, response);

        expect(loginQueue.length).toEqual(2);
        expect(loginQueue[0]).toEqual(401);
        expect(loginQueue[1].d).toEqual("Not Authorized");
    });

});
