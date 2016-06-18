(function () {
    "use strict";

    var $rootScope,
        $location,
        $routeParams,
        $window,
        route;

    beforeEach(module("dtApp"));

    describe("Navigation Tests", function () {

        beforeEach(inject(function (_$rootScope_, _$location_, _$routeParams_, _$window_, $controller) {

            $rootScope = _$rootScope_;
            $location = _$location_;
            $routeParams = _$routeParams_;
            $window = _$window_;

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

        it("will set isAuthenticated properly", function() {

            $window.sessionStorage.token = "foo";
            expect($rootScope.isAuthenticated()).toBeTruthy();

            delete $window.sessionStorage.token;
            expect($rootScope.isAuthenticated()).not.toBeTruthy();
        });

        it("should perform logout appropriately when use is authenticated", function() {

            $window.sessionStorage.token = "foo";
            $rootScope.performLogAction();

            expect($window.sessionStorage.token).toBeUndefined();
            expect($rootScope.logAction).toEqual("LOG IN");

        });

        it("should perform redirect to login page appropriately when user is not authenticated", function() {

            var redirectQueue = [];

            $location.path = function(redirectLocation) {
                redirectQueue.push(redirectLocation);
            };

            delete $window.sessionStorage.token;
            $rootScope.performLogAction();

            expect(redirectQueue.length).toEqual(1);
            expect(redirectQueue[0]).toEqual("/di/login");
        });

        it("should handle login event properly and set logAction appropriately", function() {

            $window.sessionStorage.token = "foo";
            $rootScope.$broadcast("login");
            expect($rootScope.logAction).toEqual("LOG OUT");

            delete $window.sessionStorage.token;
            $rootScope.$broadcast("login");
            expect($rootScope.logAction).toEqual("LOG IN");
        });

    });

}());
