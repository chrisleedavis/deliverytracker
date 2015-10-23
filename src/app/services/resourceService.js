(function(angular) {
    "use strict";

    angular.module("dtServices")
        .factory("dtResourceService", ["$resource", "$http", function($resource, $http) {

            var resourceService = function (url, params, customizedActions) {

                //provide ability to add custom actions for api
                return $resource(url, params || {}, _.extend({}, customizedActions || {}, { "update": {method:"PUT"} }));

            };

            return resourceService;
        }]);

}(angular));
