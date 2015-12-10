(function(angular) {
    "use strict";

    angular.module("dtModels").factory("dtRouteModel", ["dtRouteService", "$q",
        function(routeService, $q) {

            var Model = function() {
                return this;
            };

            Model.prototype.getRoutes = function() {

                var self = this,
                    defer = $q.defer();

                routeService.get({}, function(routes) {

                    self.routes = routes.d;
                    defer.resolve(self.routes);
                });

                return defer.promise;
            };

            return new Model();

        }]);

}(angular));
