(function () {
    "use strict";

    var interceptor,
        waitCursorService,
        $timeout;

    beforeEach(module("dtServices"));

    describe("Resource Service Tests", function () {

        //mock $resource for tests
        beforeEach(module("ngResource", function ($provide) {
            $provide.factory("$resource", function () {
                return function (url, params, customizedActions) {

                    return {
                        url: url,
                        params: params,
                        customizedActions: customizedActions,
                        get: function() {
                            return {
                                $promise: {
                                    then: angular.noop
                                }
                            };
                        }
                    };
                };
            });
        }));

        beforeEach(inject(function (dtWaitCursorService, dtHttpInterceptor, _$timeout_) {

            interceptor = dtHttpInterceptor;
            waitCursorService = dtWaitCursorService;
            $timeout = _$timeout_;

        }));

        it("should return the proper results from the $resource service",
            inject(function (dtResourceService) {
                var url = "foo",
                    params = { foo: "bar" },
                    customizedActions = { "update": {method:"PUT"} },
                    results = dtResourceService(url, params, customizedActions);

                expect(results.url).toEqual(url);
                expect(results.params).toEqual(params);
                expect(results.customizedActions).toEqual(customizedActions);
            }
        ));

        it("should return the proper results from the $resource service with no params or customized actions",
            inject(function (dtResourceService) {
                var url = "foo",
                    results = dtResourceService(url);

                expect(results.url).toEqual(url);
                expect(results.params).toEqual({});
            }
        ));

        it("should show the wait cursor when a request is made BUT only if it's not already spinning", function () {

            var config = { foo: "bar", headers: { Authorization: "test" } };

            spyOn(waitCursorService, "showSpinner").and.callThrough();

            //if config provided, it will be returned; otherwise, return promise obj
            expect(interceptor.request(config)).toEqual(config);
            expect(waitCursorService.showSpinner).toHaveBeenCalled();

            interceptor.request().then(function (conf) {
                expect(conf).toBeUndefined();
                expect(waitCursorService.showSpinner).toHaveBeenCalled();
            });

            $timeout.flush(); //dealing with promises during test, call flush to get 'then' to work
        });

        it("should not call the wait cursor if the request is made while the wait cursor is already spinning", function () {

            var config = { foo: "bar", headers: { Authorization: "test" } };

            spyOn(waitCursorService, "showSpinner").and.callThrough();
            waitCursorService._mockSpinner({ el: {} });

            //verify spinner won't get called again if already spinning
            expect(interceptor.request(config)).toEqual(config);
            expect(waitCursorService.showSpinner).not.toHaveBeenCalled();
        });

        it("should stop the wait cursor if the request receives an error", function () {

            var rejection = { foo: "bar" };

            spyOn(waitCursorService, "hideSpinner").and.callThrough();
            waitCursorService._mockSpinner({ stop: angular.noop });

            //verify spinner is stopped and rejection is received
            try {
                interceptor.requestError(rejection);
            } catch (e) {
                expect(_.isObject(e)).toBeTruthy();
                expect(e.foo).toEqual("bar");
                expect(waitCursorService.hideSpinner).toHaveBeenCalled();
            }
        });

        it("should stop the wait cursor if the response receives an error", function () {

            var response = { foo: "bar" };

            spyOn(waitCursorService, "hideSpinner").and.callThrough();
            waitCursorService._mockSpinner({ stop: angular.noop });

            //verify spinner is stopped and response is received
            try {
                interceptor.responseError(response);
            } catch (e) {
                expect(_.isObject(e)).toBeTruthy();
                expect(e.foo).toEqual("bar");
                expect(waitCursorService.hideSpinner).toHaveBeenCalled();
            }
        });

        it("should handle response appropriately and should NOT stop the wait cursor with other pending requests", function () {

            var response = { foo: "bar", headers: function(key) { return key; } };

            spyOn(waitCursorService, "hideSpinner").and.callThrough();
            waitCursorService._mockSpinner({ stop: angular.noop });
            interceptor._mockPendingRequests([1, 2, 3]);

            expect(interceptor.response(response)).toEqual(response);
            expect(waitCursorService.hideSpinner).not.toHaveBeenCalled();

            //verify response is returned within promise object if response param is undefined
            interceptor.response().then(function (res) {
                expect(res).toBeUndefined();
            });

            $timeout.flush(); //dealing with promises during test, call flush to get 'then' to work
        });

        it("should handle response appropriately and SHOULD STOP the wait cursor with NO other pending requests", function () {

            var response = { foo: "bar", headers: function(key) { return key; } };

            spyOn(waitCursorService, "hideSpinner").and.callThrough();
            waitCursorService._mockSpinner({ stop: angular.noop });
            interceptor._mockPendingRequests([]);

            expect(interceptor.response(response)).toEqual(response);
            expect(waitCursorService.hideSpinner).toHaveBeenCalled();
        });

    });

}());

