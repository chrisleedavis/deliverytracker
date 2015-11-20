(function(angular) {
    "use strict";

    var pendingRequests = [];

    angular.module("dtServices")
        .config(["$httpProvider", function($httpProvider) {
            $httpProvider.interceptors.push("dtHttpInterceptor");
        }])
        .factory("dtResourceService", ["$resource", function($resource) {

            var resourceService = function (url, params, customizedActions) {

                //provide ability to add custom actions for api
                return $resource(url, params || {}, _.extend({}, customizedActions || {}, { "update": {method:"PUT"} }));

            };

            return resourceService;
        }])
        .factory("dtHttpInterceptor", ["$q", "dtWaitCursorService", "dtAlertService", "$window",
            function($q, waitCursorService, alertService, $window) {

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
                            config.headers.Authorization = "Bearer " + $window.sessionStorage.token;
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
