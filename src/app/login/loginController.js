(function(angular) {
    "use strict";

    angular.module("dtApp")
<<<<<<< HEAD
        .controller("LoginCtrl", ["$scope", "$window", "$location", "dtLoginService", "dtEmitLoginModel", "$q",
            function($scope, $window, $location, loginService, emitLoginModel, $q) {
=======
        .controller("LoginCtrl", ["$scope", "$window", "$location", "dtLoginService", "$q",
            function($scope, $window, $location, loginService, $q) {
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba

                var setupLogin = function() {
                    $scope.login = {
                        username: null,
                        password: null
                    };
                };

                $scope.performLogin = function() {
                    var defer = $q.defer();

                    loginService.save($scope.login, function(data) {
<<<<<<< HEAD
                        
                        emitLoginModel.emitLogin($scope, data);
                        
=======
                        $window.sessionStorage.token = data.d;
                        $location.path("/");
                        $scope.$emit("login");
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba
                        defer.resolve();
                    });

                    return defer.promise;
                };

                setupLogin();

            }]);

}(angular));