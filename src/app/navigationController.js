(function(angular) {
    "use strict";

    angular.module("dtApp")
        .controller("NavCtrl", ["$scope", "$location", "$routeParams",
            function($scope, $location, $routeParams) {

                $scope.isActive = function(page) {
                    return page === $routeParams.page;
                };

                $scope.redirect = function(path) {
                    $location.path(path);
                };

            }]);

}(angular));
