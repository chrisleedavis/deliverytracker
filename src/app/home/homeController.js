(function(angular) {
    "use strict";

    angular.module("dtApp")
        .controller("HomeCtrl", ["$scope", function($scope) {

            $scope.message = "woo hoo, it works!";

        }]);

}(angular));
