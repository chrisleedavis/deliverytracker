"use strict";

describe("Route Model Tests", () => {

    it("should create schema properly", () => {

        const Route = require("./routeModel"),
            data = { routeNumber: "Hng43", employeeId: "f234KL" },
            route = new Route(data);

        expect(route.routeNumber).toEqual(data.routeNumber);
        expect(route.employeeId).toEqual(data.employeeId);
    });

});
