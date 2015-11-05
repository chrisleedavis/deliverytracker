"use strict";

describe("Authentication Controller Tests", () => {

    const mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache");

    let basicStrategy,
        authQueue,
        username,
        password,
        callback,
        user,
        hashError,
        findOneError,
        assertBasicConfig = () => {
            expect(authQueue[1]).toEqual("basic");
            expect(authQueue[2]).toEqual({ session: false });
        };

    beforeEach(() => {

        authQueue = [];
        callback = function() { authQueue.push(arguments); };
        password = undefined;
        user = undefined;
        hashError = undefined;
        findOneError = undefined;

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
                    cb(username, password, callback);
                }
            }
        });

        mockery.registerMock("../models/userModel", {
            findOne: () => {
                return {
                    then: (fn) => {

                        if (!findOneError) {
                            fn(user);
                        }

                        return {
                            "catch": (fn) => {

                                if (findOneError)  {
                                    fn(findOneError);
                                }
                            }
                        };
                    }
                };
            }
        });

        mockery.registerMock("../models/encryptionModel", {
            compareHash: (hash1, hash2) => {

                return {
                    then: (fn) => {

                        const isMatch = hash1 === hash2;

                        if (!hashError) {
                            fn(isMatch);
                        }

                        return {
                            "catch": (fn) => {

                                if (hashError)  {
                                    fn(hashError);
                                }
                            }
                        };
                    }
                };
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should authenticate properly when hashes match", () => {

        username = "fooBar@test.com";
        password = "itWorks";
        user = { password: "itWorks" };
        require("./authenticationController");

        expect(authQueue.length).toEqual(3);
        expect(authQueue[0]["1"]).toEqual(user); //proves they're authenticated if user returned
        assertBasicConfig();
    });

    it("should authenticate properly when passwords don't match", () => {
        username = "fooBar@test.com";
        password = "itWorks";
        user = { password: "doesntWork" };
        require("./authenticationController");

        expect(authQueue.length).toEqual(3);
        expect(authQueue[0]["1"]).not.toBeTruthy();
        assertBasicConfig();
    });

    it("should authenticate properly when user is not defined", () => {
        require("./authenticationController");

        expect(authQueue.length).toEqual(3);
        expect(authQueue[0]["1"]).not.toBeTruthy();
        assertBasicConfig();
    });

    it("should return error if hash comparison throws error", () => {
        username = "fooBar@test.com";
        password = "itWorks";
        user = { password: "itWorks" };
        hashError = "fooBar";
        require("./authenticationController");

        expect(authQueue.length).toEqual(3);
        expect(authQueue[0]["0"]).toEqual(hashError);
        assertBasicConfig();
    });

    it("should return error if findOne throws error", () => {
        username = "fooBar@test.com";
        password = "itWorks";
        user = { password: "itWorks" };
        findOneError = "fooBar";
        require("./authenticationController");

        expect(authQueue.length).toEqual(3);
        expect(authQueue[0]["0"]).toEqual(findOneError);
        assertBasicConfig();
    });

});
