(function(angular) {
    "use strict";

    var pendingRequests = [],
        authorizationToken;

    angular.module("dtServices")
        .config(["$httpProvider", function($httpProvider) {
            //temporary for MVP
            $httpProvider.defaults.headers.common.Authorization = "Basic " + authorizationToken;
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.interceptors.push("dtHttpInterceptor");
        }])
        .factory("dtResourceService", ["$resource", function($resource) {

            var resourceService = function (url, params, customizedActions) {

                //provide ability to add custom actions for api
                return $resource(url, params || {}, _.extend({}, customizedActions || {}, { "update": {method:"PUT"} }));

            };

            return resourceService;
        }])
        .factory("dtHttpInterceptor", ["$q", "dtWaitCursorService", "dtAlertService",
            function($q, waitCursorService, alertService) {

                var reportFailureAndStopWaitCursor = function(type) {

                    var message = ["An error occurred with the ", type, ", please check logs for details"];

                    waitCursorService.hideSpinner(); //stop wait cursor on failures
                    alertService.showError(message.join(""));
                };

                return {
                    //for testing the responses
                    _mockPendingRequests: function(mock) {
                        pendingRequests = mock;
                    },

                    request: function(config) {

                        if (config) {
                            config.headers.Authorization = authorizationToken;
                        }

                        if (!waitCursorService.isSpinning()) {
                            waitCursorService.showSpinner();
                        }

                        return config || $q.when(config);
                    },
                    requestError: function(rejection) {

                        reportFailureAndStopWaitCursor("request");
                        $q.reject(rejection);
                    },
                    response: function (response) {

                        var hasPendingRequests = pendingRequests.length > 0;

                        if (response) {
                            authorizationToken = response.headers("Authorization") || authorizationToken;
                        }

                        if (!hasPendingRequests) {
                            waitCursorService.hideSpinner();
                        }

                        return response || $q.when(response); //cannot extract d from response, resource module expects all responses in the form of an object
                    },
                    responseError: function (response) {

                        reportFailureAndStopWaitCursor("response");
                        $q.reject(response);
                    }
                };
        }]);

}(angular));
