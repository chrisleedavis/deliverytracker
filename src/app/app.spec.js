(function () {
    "use strict";

    var $route;

    beforeEach(module("dtApp"));

    describe("App Tests", function () {

        beforeEach(inject(function (_$route_) {

            $route = _$route_;

        }));

        it("dynamic route resolves correctly", function () {

            var route = $route.routes["/:directory/:page"],
                routeParams = { directory: "foo", page: "bar" };

            expect(route.templateUrl(routeParams)).toEqual("/templates/foo/_bar.html");

        });

    });

}());
