(function () {
    "use strict";

    var $rootScope,
        $location,
        route;

    beforeEach(module("dtApp"));

    describe("Navigation Tests", function () {

        beforeEach(inject(function (_$rootScope_, _$location_, $controller) {

            $rootScope = _$rootScope_;
            $location = _$location_;

            //mock path functionality for tests
            $location.path = function(path) {
                route = "#" + path;
            };

            $controller("NavCtrl", { $scope: $rootScope, $location: $location });

        }));

        it("will redirect user correctly", function () {

            var path = "fooBar";

            $rootScope.redirect(path);
            expect(route).toEqual("#" + path);

        });

    });

}());
