"use strict";

describe("Employees Controller Tests", () => {

    let _ = require("lodash"),
        mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache"),
        route,
        routeQueue,
        error;

    beforeEach(() => {

        error = undefined;
        route = { routeNumber: "155KUI", employeeId: "Gn43Kl" };
        routeQueue = [];

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../models/routeModel", class {

            constructor(data) {
                _.assign(this, data);
            }

            save() {
                return {
                    then: (fn) => {

                        fn(route);

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

                                const routes = [{ employeeId: "YH42LLn" }, { employeeId: "78DDY00" }];
                                fn(routes);

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

    it("should add/get routes properly", () => {
        let RoutesController = require("./routesController"),
            routes = new RoutesController(),
            request = { body: route, user: { _id: 2 } },
            response = { send: function(data) { routeQueue.push(data); } };

        routes.addRoute(request, response);

        expect(routeQueue.length).toEqual(1);
        expect(routeQueue[0].d.routeNumber).toEqual(route.routeNumber);

        routes.findAllRoutes(request, response);
        expect(routeQueue.length).toEqual(2);
        expect(routeQueue[0].d.routeNumber).toEqual(route.routeNumber);
    });

    it("should send error when attempting to add/get routes", () => {
        let RoutesController = require("./routesController"),
            routes = new RoutesController(),
            request = { body: route, user: { _id: 2 } },
            response = { send: function(data) { routeQueue.push(data); } };

        const errorMessage = "An error occurred.  Please contact the system administrator.";

        error = true;
        routes.addRoute(request, response);

        expect(routeQueue.length).toEqual(2);
        expect(routeQueue[1].d.error).toEqual(errorMessage);

        routes.findAllRoutes(request, response);
        expect(routeQueue.length).toEqual(4);
        expect(routeQueue[3].d.error).toEqual(errorMessage);
    });

});
