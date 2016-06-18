(function(angular) {
    "use strict";

    angular.module("dtModels").factory("dtEmitLoginModel", ["$window", "$location",
        function($window, $location) {

            var Model = function() {
                return this;
            };

            Model.prototype.emitLogin = function($scope, data) {

                $window.sessionStorage.token = data.d;
                $location.path("/");
                $scope.$emit("login");
                
            };

            return new Model();

        }]);

}(angular));
