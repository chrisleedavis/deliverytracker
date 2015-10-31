"use strict";

describe("Global Error Handler Tests", () => {

    let mockery = require("mockery"),
        clearModuleCache = require("./_clearModuleCache"),
        consoleLog,
        originalConsoleError,
        originalDate;

    beforeEach(() => {

        consoleLog = [];
        originalDate = Date;
        originalConsoleError = console.error;
        console.error = (message) => { consoleLog.push(message); };

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("simple-node-logger", {
            createRollingFileLogger: () => {
                return {
                    error: (param1, param2) => {
                        console.error(param1);
                        console.error(param2);
                    }
                };
            }
        });

        mockery.registerMock("mkdirp", () => {});
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
        console.error = originalConsoleError;
        Date = originalDate;
    });

    it("should instantiate Global Error Handler properly", () => {

        let server = {
                use: (fn) => {
                    let err = { stack: "fooBar" },
                        req = {},
                        res = { status: (s) => { console.error(s); }, send: (m) => { console.error(m); } },
                        next = (e) => { console.error(e); };

                    fn(err, req, res, next);
                }
            },
            GlobalErrorHandler = require("./globalErrorHandler");

        Date = class { toJSON() { console.error("fooBarDate"); return "fakeDateHere"; } };
        new GlobalErrorHandler(server);

        expect(consoleLog.length).toEqual(7);
        expect(consoleLog[0]).toEqual("fooBarDate");
        expect(consoleLog[1]).toEqual("fakeDateHere");
        expect(consoleLog[2]).toEqual("fooBar");
        expect(consoleLog[3]).toEqual("fooBar");
        expect(consoleLog[4]).toEqual({ stack: "fooBar" });
        expect(consoleLog[5]).toEqual(500);
        expect(consoleLog[6]).toEqual({ error: "An error occurred.  Please contact the system administrator." });
    });
});