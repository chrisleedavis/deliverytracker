(function(angular) {
    "use strict";

    angular.module("dtApp")
        .controller("SignUpCtrl",
         ["$scope", "$location", "dtUsersService", "dtEmitLoginModel","$q",
            function($scope, $location, usersService, emitLoginModel, $q) {
                
                $scope.registration = {
                    firstname: null,
                    lastname : null,
                    email : null,
                    password : null,
                    passwordConfirm : null
                };

                $scope.register = function () {
                    var defer = $q.defer();

                    usersService.save($scope.registration, function(data) {
                        
                        emitLoginModel.emitLogin($scope, data);

                        defer.resolve();
                        
                    });

                    return defer.promise;
                };

            }]);

}(angular));