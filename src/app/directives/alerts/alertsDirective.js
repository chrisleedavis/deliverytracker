(function (angular) {
    "use strict";

    angular.module("dtDirectives").directive("dtAlerts", ["$timeout", function ($timeout) {

        return {
            restrict: "E",
            replace: true,
            templateUrl: "/templates/directives/alerts/_alerts.html",
            scope: {},
            link: function (scope, element, attrs) {

                scope.clearAlert = function () {
                    scope.alert = undefined;
                };

                scope.$on("showAlert", function (event, alert) {

                    scope.alert = alert;

                    if (alert.useTimeout) {
                        $timeout(function () {
                            scope.clearAlert();
                        }, 3000); //3 seconds for auto cleanup
                    }

                });

                scope.$on("clearAlert", function () {
                    scope.clearAlert();
                });
            }
        };

    }]);

}(angular));