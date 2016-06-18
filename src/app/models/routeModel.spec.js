(function () {
    "use strict";

    var model,
        routes,
        timeout,
        httpMock;

    beforeEach(module("dtModels"));

    describe("Route Model Tests", function () {

        beforeEach(function () {

            routes = [
                { _id: "23452622312", number: "T5346", driver: "Fred Smith" },
                { _id: "23452622313", number: "K2342", driver: "Amy Wilson" },
                { _id: "23452622314", number: "RE3214", driver: "Chuck Sanders" }
            ];

            inject(function (dtRouteModel, $timeout, $httpBackend) {
                model = dtRouteModel;
                timeout = $timeout;
                httpMock = $httpBackend;
            });
        });

        it("should load routes appropriately from API", function () {

            httpMock.when("GET", "api/routes").respond({ d: routes });

            model.getRoutes().then(function (routeList) {

                expect(routeList).toEqual(routes);
            });

            httpMock.flush();
            timeout.flush();

        });

    });

}());
