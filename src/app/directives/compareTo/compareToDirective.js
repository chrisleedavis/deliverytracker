(function (angular) {
    "use strict";

    angular.module("dtDirectives").directive("dtCompareTo", function () {

        return {
            require: "ngModel",
            scope: {
                otherModelValue: '=dtCompareTo'
            },
            link: function (scope, element, attrs, ngModel) {

                ngModel.$validators.dtCompareTo = function(modelValue) {
                    return modelValue === scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };

    });

}(angular));