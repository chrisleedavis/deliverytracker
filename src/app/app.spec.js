(function () {
    "use strict";

    var $route,
        route,
        logMessages,
        $exceptionHandler,
        $location,
        logService,
        $timeout,
        $q,
        $window,
        resolver;

    beforeEach(module("dtApp"));

    describe("App Tests", function () {

        beforeEach(module("dtServices", function ($provide) {
            $provide.factory("dtLogService", function () {
                return {
                    save: function(log) {
                        logMessages.push(log);
                    }
                };
            });

            //mock log.error too
            console.error = angular.noop;
        }));

        beforeEach(inject(function (_$route_, _$exceptionHandler_, _$timeout_, dtLogService, _$location_, _$q_, _$window_) {

            $route = _$route_;
            $exceptionHandler = _$exceptionHandler_;
            $timeout = _$timeout_;
            logMessages = [];
            logService = dtLogService;
            $location = _$location_;
            $q = _$q_;
            $window = _$window_;

            route = $route.routes["/di/:page"];
            resolver = route.resolve.resolveRoute[route.resolve.resolveRoute.length-1];
        }));

        it("dynamic route resolves correctly", function () {

            var routeParams = { page: "bar" };

            expect(route.templateUrl(routeParams)).toEqual("/templates/bar/_bar.html");

        });

        it("should resolve route properly when attempting to get to login page", function() {

            delete $window.sessionStorage.token;
            route.current = {
                params: {
                    page: "login"
                }
            };

            resolver($q, route, $window, $location).then(function(isValid) {
                expect(isValid).toBeTruthy();
            });

            $timeout.flush();
        });

        it("should resolve route properly when attempting to get to authenticated page and token is present", function() {

            $window.sessionStorage.token = "foo";
            route.current = {
                params: {
                    page: "notifications"
                }
            };

            resolver($q, route, $window, $location).then(function(isValid) {
                expect(isValid).toBeTruthy();
            });

            $timeout.flush();
        });

        it("should reject route properly when user is not authenticated", function() {

            delete $window.sessionStorage.token;
            route.current = {
                params: {
                    page: "notifications"
                }
            };

            resolver($q, route, $window, $location).catch(function(isValid) {
                expect(isValid).not.toBeTruthy();
            });

            $timeout.flush();
        });

        it("should handle global exceptions properly where error is not an object but just a message", function () {

            var error = "foo bar";
            $timeout(function () { throw error; });
            $timeout.flush();
            expect(logMessages[0]).toEqual({ level: "error", message: error, cause: undefined, exception: error, stack: error });
        });

        it("should handle global exceptions properly where error IS an object", function () {

            var testError = { message: "foo", stack: "bar" };
            $exceptionHandler(testError);
            expect(logMessages[0]).toEqual({ level: "error", message: "foo", cause: undefined, exception: "foo", stack: "bar" });
        });

        it("should handle global exceptions properly when there IS NO ERROR", function () {

            spyOn(logService, "save").and.callThrough();

            $exceptionHandler(undefined);

            expect(logService.save).not.toHaveBeenCalled();
        });

    });

}());
