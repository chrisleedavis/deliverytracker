(function () {
    "use strict";

    var $route,
        logMessages,
        $exceptionHandler,
        logService,
        $timeout;

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

        beforeEach(inject(function (_$route_, _$exceptionHandler_, _$timeout_, dtLogService) {

            $route = _$route_;
            $exceptionHandler = _$exceptionHandler_;
            $timeout = _$timeout_;
            logMessages = [];
            logService = dtLogService;

        }));

        it("dynamic route resolves correctly", function () {

            var route = $route.routes["/:directory/:page"],
                routeParams = { directory: "foo", page: "bar" };

            expect(route.templateUrl(routeParams)).toEqual("/templates/foo/_bar.html");

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
