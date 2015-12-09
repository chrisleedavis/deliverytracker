(function(angular) {
    "use strict";

    //provide help with navigation loaded to ensure it's loaded when DOM is ready
    var isLoaded = { value: false };
    window.document.addEventListener("DOMContentLoaded", function() {
        isLoaded.value = true;
    });

    angular.module("dtApp")
        .controller("NavCtrl", ["$scope", "$location", "$window", "$routeParams",
            function($scope, $location, $window, $routeParams) {

                var setLogAction = function() {
                        $scope.logAction = $scope.isAuthenticated() ? "LOG OUT": "LOG IN";
                    };

                $scope.isLoaded = isLoaded;

                $scope.isActive = function(page) {
                    return page === $routeParams.page;
                };

                $scope.redirect = function(path) {
                    $location.path(path);
                };

                $scope.isAuthenticated = function() {
                    return $window.sessionStorage.token;
                };

                $scope.performLogAction = function() {

                    if ($scope.isAuthenticated()) {
                        delete $window.sessionStorage.token;
                        $location.path("/");
                        setLogAction();
                    } else {
                        $location.path("/di/login");
                    }
                };

                $scope.$on("login", function() {
                    setLogAction();
                });

                setLogAction();

            }]);

}(angular));
