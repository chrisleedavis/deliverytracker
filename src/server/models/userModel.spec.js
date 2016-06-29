"use strict";

describe("User Model Tests", () => {

    const mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache");

    let User,
        user,
        credentials,
        hashError,
        findOneError,
        authQueue,
        callback;

    beforeEach(() => {
        user = undefined;
        authQueue = [];
        callback = function() { authQueue.push(arguments); };
        credentials = {};
        hashError = undefined;
        findOneError = undefined;

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("./encryptionModel", {
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

        User = require("./userModel");
        User.findOne = () => {
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
        };
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should create schema properly", () => {

        const data = { email: "foobar@test.com", password: "itWorks" },
            user = new User(data);

        expect(user.email).toEqual(data.email);
        expect(user.password).toEqual(data.password);
    });

    it("should authenticate properly when hashes match", () => {

        credentials.email = "fooBar@test.com";
        credentials.password = "itWorks";
        user = { password: "itWorks" };
        User.login(credentials, callback);

        expect(authQueue.length).toEqual(1);
        expect(authQueue[0]["1"]).toEqual(user); //proves they're authenticated if user returned
    });

    it("should not authenticate properly when passwords don't match", () => {
        credentials.email = "fooBar@test.com";
        credentials.password = "itWorks";
        user = { password: "doesntWork" };
        User.login(credentials, callback);

        expect(authQueue.length).toEqual(1);
        expect(authQueue[0]["1"]).not.toBeTruthy();
    });

    it("should authenticate properly when user is not defined", () => {
        User.login(credentials, callback);

        expect(authQueue.length).toEqual(1);
        expect(authQueue[0]["1"]).not.toBeTruthy();
    });

    it("should return error if hash comparison throws error", () => {
        credentials.username = "fooBar@test.com";
        credentials.password = "itWorks";
        user = { password: "itWorks" };
        hashError = "fooBar";
        User.login(credentials, callback);

        expect(authQueue.length).toEqual(1);
        expect(authQueue[0]["0"]).toEqual(hashError);
    });

    it("should return error if findOne throws error", () => {
        credentials.username = "fooBar@test.com";
        credentials.password = "itWorks";
        user = { password: "itWorks" };
        findOneError = "fooBar";
        User.login(credentials, callback);

        expect(authQueue.length).toEqual(1);
        expect(authQueue[0]["0"]).toEqual(findOneError);
    });

});
