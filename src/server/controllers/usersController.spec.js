"use strict";

describe("Users Controller Tests", () => {

    let _ = require("lodash"),
        mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache"),
        user,
        userQueue,
        error;

    beforeEach(() => {

        error = undefined;
        user = { username: "foo.bar@test.com", password: "itWorks" };
        userQueue = [];

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../models/userModel", class {

            constructor(data) {
                _.assign(this, data);
            }

            save() {
                return {
                    then: (fn) => {

                        fn(user);

                        return {
                            "catch": (fn) => {

                                if (error)  {
                                    fn({});
                                }
                            }
                        };
                    }
                };
            }

            static find(searchObj) {
                return {
                    exec: () => {
                        return {
                            then: (fn) => {

                                const users = [{ username: "test.me@foo.com", password: "blah" }, { username: "foo.bar@test.com", password: "itWorks" }];
                                fn(users);

                                return {
                                    "catch": (fn) => {

                                        if (error)  {
                                            fn({});
                                        }
                                    }
                                };
                            }
                        };
                    }
                };
            }
        });

        mockery.registerMock("../models/encryptionModel", {
            encryptText: (text) => {
                return {
                    then: (fn) => {
                        fn();
                        return {
                            "catch": (fn) => {

                                if (error)  {
                                    fn({});
                                }
                            }
                        }
                    }
                }
            },
            encryptToken: (user) => {
                return user;
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

    it("should add/get users properly", () => {
        let UsersController = require("./usersController"),
            users = new UsersController(),
            request = { body: user, user: { _id: 2 } },
            response = { send: function(data) { userQueue.push(data); } };

        users.addUser(request, response);

        expect(userQueue.length).toEqual(1);
        expect(userQueue[0].d.username).toEqual(user.username);

        users.findAllUsers(request, response);
        expect(userQueue.length).toEqual(2);
        expect(userQueue[0].d.username).toEqual(user.username);
    });

    it("should send error when attempting to add/get users", () => {
        let UsersController = require("./usersController"),
            users = new UsersController(),
            request = { body: user, user: { _id: 2 } },
            response = { send: function(data) { userQueue.push(data); } };

        const errorMessage = "An error occurred.  Please contact the system administrator.";

        error = true;
        users.addUser(request, response);

        expect(userQueue.length).toEqual(3);
        expect(userQueue[1].d.error).toEqual(errorMessage);

        users.findAllUsers(request, response);
        expect(userQueue.length).toEqual(5);
        expect(userQueue[4].d.error).toEqual(errorMessage);
    });

});
