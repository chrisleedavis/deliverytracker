"use strict";

describe("Mongo Db Tests", () => {

    let mockery = require("mockery"),
        _ = require("lodash"),
        clearModuleCache = require("../_clearModuleCache"),
        ObjectId = require("mongodb").ObjectId,
        crudQueue,
        mongoDb,
        error;

    beforeEach(() => {

        error = null;
        crudQueue = [];

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("mongodb", {
            MongoClient: {
                connect: () => {
                    let database = {
                        collection: () => {
                            return {
                                insertOne: (newObj) => {
                                    crudQueue.push(newObj);
                                    return {
                                        then: (cb) => {
                                            cb({ops: ["insertOneThen"]});
                                            return {
                                                catch: (cb) => {
                                                    if (error) {
                                                        error.processed = true;
                                                        cb(error);
                                                    }
                                                }
                                            };
                                        }
                                    };
                                },
                                find: (searchObj) => {
                                    crudQueue.push(searchObj);
                                    return {
                                        toArray: () => {
                                            return {
                                                then: (cb) => {
                                                    cb("findThen");
                                                    return {
                                                        catch: (cb) => {
                                                            if (error) {
                                                                error.processed = true;
                                                                cb(error);
                                                            }
                                                        }
                                                    };
                                                }
                                            }
                                        }
                                    };
                                },
                                updateOne: (searchObj, updatedObj) => {
                                    crudQueue.push(searchObj);
                                    crudQueue.push(updatedObj);
                                    return {
                                        then: (cb) => {
                                            cb({ops: ["updateOneThen"]});
                                            return {
                                                catch: (cb) => {
                                                    if (error) {
                                                        error.processed = true;
                                                        cb(error);
                                                    }
                                                }
                                            };
                                        }
                                    };
                                },
                                delete: (searchObj) => {
                                    crudQueue.push(searchObj);
                                    return {
                                        catch: (cb) => {
                                            if (error) {
                                                error.processed = true;
                                                cb(error);
                                            }
                                        }
                                    };
                                }
                            };
                        }
                    };

                    return {
                        then: (cb) => { cb(database); }
                    };
                }
            },
            ObjectId: ObjectId
        });

        mockery.registerMock("simple-node-logger", {
            createRollingFileLogger: () => {
                return {
                    error: _.noop //actual testing for this is via globalErrorHandler.spec
                };
            }
        });

        mockery.registerMock("mkdirp", () => {});

        mockery.registerMock("../config/config", {

            databaseProvider:"mongo",
            databaseUrl:"blah:test",
            databaseStartCommand:"foo bar --test"

        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should throw error if attempting to CRUD with undefined object", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();

        try {
            mongoDb.create("employees", undefined);
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Object must be defined");
        }

        try {
            mongoDb.read("employees", undefined);
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Object must be defined");
        }

        try {
            mongoDb.update("notifications", null);
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Object must be defined");
        }

        try {
            mongoDb.delete("notifications", undefined);
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Object must be defined");
        }

    });

    it("should create properly from the database", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();

        mongoDb.create("employees", { firstName: "Bob" }, (text) => {
            expect(text).toEqual("insertOneThen");
        });

        expect(crudQueue.length).toEqual(1);
        expect(crudQueue[0].firstName).toEqual("Bob");
    });

    it("should read properly from the database", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();

        mongoDb.read("employees", { firstName: "Bob" }, (text) => {
            expect(text).toEqual("findThen");
        });

        expect(crudQueue.length).toEqual(1);
        expect(crudQueue[0].firstName).toEqual("Bob");
    });

    it("should update properly from the database", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();

        mongoDb.update("employees", { firstName: "Bob" }, { lastName: "Test" }, (text) => {
            expect(text).toEqual("updateOneThen");
        });

        expect(crudQueue.length).toEqual(2);
        expect(crudQueue[0].firstName).toEqual("Bob");
        expect(crudQueue[1].lastName).toEqual("Test");
    });

    it("should delete properly from the database", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();

        mongoDb.delete("employees", { firstName: "Bob" });

        expect(crudQueue.length).toEqual(1);
        expect(crudQueue[0].firstName).toEqual("Bob");
    });

    it("should format searchObj properly when there's only an _id to search by", () => {

        let MongoDb = require("./mongoDb"),
            searchObj = { _id: "5632ba22434ecae0445e547b" };
        mongoDb = new MongoDb();

        mongoDb.read("employees", searchObj, (text) => {
            expect(text).toEqual("findThen");
        });

        expect(crudQueue.length).toEqual(1);
        expect(crudQueue[0]._id).toEqual(new ObjectId("5632ba22434ecae0445e547b"));
    });

    it("should error on create properly", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();
        error = { stack: "error occurred" };

        mongoDb.create("employees", { firstName: "Bob" }, _.noop);

        expect(error.processed).toBeTruthy();
    });

    it("should error on read properly", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();
        error = { stack: "error occurred" };

        mongoDb.read("employees", { firstName: "Bob" }, _.noop);

        expect(error.processed).toBeTruthy();
    });

    it("should error on update properly", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();
        error = { stack: "error occurred" };

        mongoDb.update("employees", { firstName: "Bob" }, { lastName: "Test" }, _.noop);

        expect(error.processed).toBeTruthy();
    });

    it("should error on delete properly", () => {

        let MongoDb = require("./mongoDb");
        mongoDb = new MongoDb();
        error = { stack: "error occurred" };

        mongoDb.delete("employees", { firstName: "Bob" });

        expect(error.processed).toBeTruthy();
    });

});
