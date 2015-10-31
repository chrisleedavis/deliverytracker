"use strict";

describe("Server Tests", () => {

    let mockery = require("mockery"),
        consoleLog,
        originalConsoleLog;

    beforeEach(() => {

        consoleLog = [];
        originalConsoleLog = console.log;
        console.log = (message) => { consoleLog.push(message); };

        //make sure module can be loaded for each test (only delete server b/c globals is still needed)
        delete require.cache[require.resolve("./server")];

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("express", () => {
            console.log("express is instantiated");
            return {
                listen: (port) => {
                    console.log("listening on port: " + port);
                },
                use: () => {
                    console.log("using object");
                }
            }
        });
        mockery.registerMock("./router", class {
            constructor(express, server) {
                console.log("express is injected");
                console.log("server is injected");
            }
        });
        mockery.registerMock("connect-livereload", () => {
            console.log("livereload is instantiated");
        });
        mockery.registerMock("./globalErrorHandler", class { });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
        console.log = originalConsoleLog;
    });

    it("should start server properly in development mode", () => {
        let globals = require("../../build/_globals"),
            isProduction = globals.isProduction;
        globals.isProduction = false;
        let server = require("./server");

        expect(consoleLog.length).toEqual(8);
        expect(consoleLog[0]).toEqual("express is instantiated");
        expect(consoleLog[1]).toEqual("livereload is instantiated");
        expect(consoleLog[2]).toEqual("using object");
        expect(consoleLog[3]).toEqual("development mode, using liveReload");
        expect(consoleLog[4]).toEqual("express is injected");
        expect(consoleLog[5]).toEqual("server is injected");
        expect(consoleLog[6]).toEqual("Delivery Tracker server is now up...http://localhost:8888");
        expect(consoleLog[7]).toEqual("listening on port: 8888");

        globals.isProduction = isProduction;
    });

    it("should start server properly in production mode", () => {
        let globals = require("../../build/_globals"),
            isProduction = globals.isProduction;
        globals.isProduction = true;
        let server = require("./server");

        expect(consoleLog.length).toEqual(5);
        expect(consoleLog[0]).toEqual("express is instantiated");
        expect(consoleLog[1]).toEqual("express is injected");
        expect(consoleLog[2]).toEqual("server is injected");
        expect(consoleLog[3]).toEqual("Delivery Tracker server is now up...http://localhost:8888");
        expect(consoleLog[4]).toEqual("listening on port: 8888");

        globals.isProduction = isProduction;
    });
});

