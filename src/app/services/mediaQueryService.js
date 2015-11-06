(function (angular) {
    "use strict";

    angular.module("dtServices").factory("dtMediaQueryService", ["$window", "$rootScope", function ($window, $scope) {

        var updateWidthFlags = function() {

            var currentWidth = $window.innerWidth;

            $scope.isXSmall = currentWidth < 768;
            $scope.isSmall = currentWidth >= 768 && currentWidth < 992;
            $scope.isMedium = currentWidth >= 992 && currentWidth < 1200;
            $scope.isLarge = currentWidth >= 1200;
        };

        return {
            init: function() {
                updateWidthFlags();
                angular.element($window).bind("resize", function() {
                    updateWidthFlags();
                    $scope.$apply();
                });
            }
        };
    }]);

}(angular));