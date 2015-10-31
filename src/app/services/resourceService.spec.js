(function () {
    "use strict";

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

    });

}());

