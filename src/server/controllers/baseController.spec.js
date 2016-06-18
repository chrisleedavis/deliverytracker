"use strict";

describe("Base Controller Tests", () => {

    let _ = require("lodash"),
        mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache");

    beforeEach(() => {

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
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

    it("should throw error if attempting to instantiate BaseDb directly", () => {

        let BaseController = require("./baseController");

        try {
            new BaseController();
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: BaseController is an abstract class and cannot be instantiated directly");
        }

    });

    it("should handle validation errors properly", () => {

        const VALIDATION_ERROR = "ValidationError";

        let BaseController = require("./baseController"),
            Controller = class extends BaseController { constructor() { super(); } },
            controller = new Controller(),
            errorQueue = [],
            response = { send: (data) => { errorQueue.push(data); } },
            error = { name: VALIDATION_ERROR, errors: { foo: { message: "your tie is loose"} } };

        controller.handleError(response, error);

        expect(errorQueue.length).toEqual(1);
        expect(errorQueue[0].d.error).toEqual("Validation error occurred");
        expect(errorQueue[0].d.errors[0].toString()).toEqual("your tie is loose");
    });

});