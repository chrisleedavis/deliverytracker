(function(angular) {
    "use strict";

    angular.module("dtApp")
        .controller("LoginCtrl", ["$scope", "$window", "$location", "dtLoginService", "$q",
            function($scope, $window, $location, loginService, $q) {

                var setupLogin = function() {
                    $scope.login = {
                        username: null,
                        password: null
                    };
                };

                $scope.performLogin = function() {
                    var defer = $q.defer();

                    loginService.save($scope.login, function(data) {
                        $window.sessionStorage.token = data.d;
                        $location.path("/");
                        $scope.$emit("login");
                        defer.resolve();
                    });

                    return defer.promise;
                };

                setupLogin();

            }]);

}(angular));