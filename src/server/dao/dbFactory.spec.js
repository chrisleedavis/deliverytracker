"use strict";

/*
    For each of these tests, keep each of the mocking completely encapsulated
    in order to ensure the static configuration changes for each test will
    be isolated
 */

describe("Db Factory Tests - DefaultDb", () => {

    let mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache");

    beforeEach(() => {

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../config/config", {
            databaseProvider: "default"
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should yield DefaultDb instance when config set to default", () => {

        let DbFactory = require("./dbFactory"),
            DefaultDb = require("./defaultDb");

        expect(DbFactory.instance() instanceof DefaultDb).toBeTruthy();
    });

});

describe("Db Factory Tests - MongoDb", () => {

    let mockery = require("mockery"),
        BaseDb = require("./baseDb"),
        clearModuleCache = require("../_clearModuleCache");

    beforeEach(() => {

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        //mock out mongo for unit tests
        mockery.registerMock("../config/config", {
            databaseProvider: "mongo"
        });

        mockery.registerMock("./mongoDb", class extends BaseDb {
            constructor() { super(); }
            create() { }
            read() { }
            update() { }
            delete() { }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should yield MongoDb instance when config set to mongo", () => {

        let DbFactory = require("./dbFactory"),
            MongoDb = require("./mongoDb");

        expect(DbFactory.instance() instanceof MongoDb).toBeTruthy();
    });

});

describe("Db Factory Tests - FooBar", () => {

    let mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache");

    beforeEach(() => {

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../config/config", {
            databaseProvider: "fooBar"
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should throw error if database provider not found", () => {

        let DbFactory = require("./dbFactory");

        try {
            DbFactory.instance();
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Db Provider cannot be found: fooBar");
        }
    });

});


