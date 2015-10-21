(function () {
    "use strict";

    var $rootScope,
        $location,
        $routeParams,
        route;

    beforeEach(module("dtApp"));

    describe("Navigation Tests", function () {

        beforeEach(inject(function (_$rootScope_, _$location_, _$routeParams_, $controller) {

            $rootScope = _$rootScope_;
            $location = _$location_;
            $routeParams = _$routeParams_;

            //mock path functionality for tests
            $location.path = function(path) {
                route = "#" + path;
            };

            $controller("NavCtrl", { $scope: $rootScope, $location: $location, $routeParams: $routeParams });

        }));

        it("will redirect user correctly", function () {

            var path = "fooBar";

            $rootScope.redirect(path);
            expect(route).toEqual("#" + path);

        });

        it("will set isActive when active", function() {

            var page = "blah";

            $routeParams.page = page;
            expect($rootScope.isActive(page)).toBeTruthy();
            expect($rootScope.isActive("foo")).not.toBeTruthy();
        });

    });

}());
