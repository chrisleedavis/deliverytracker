(function(angular) {
    "use strict";

    angular.module("dtApp")
        .controller("ClientsCtrl", ["$scope", "dtEmployeeModel", function($scope, employeeModel) {

            var triggerTouched = function(form) {
                _.each(form.$error, function (field) {
                    _.each(field, function(errorField){
                        errorField.$setTouched();
                    });
                });
            };

            $scope.employee = {
                id: null,
                employeeNumber: null,
                firstName: null,
                lastName: null,
                image: null
            };

            $scope.uploadImage = function(file) {
                var fileReader;

                if (file) {
                    fileReader = new FileReader();
                    fileReader.onload = function(e) {
                        $scope.employee.image = e.target.result;
                    };

                    fileReader.readAsDataURL(file);
                }
            };

            $scope.saveEmployee = function() {

                if ($scope.employeeForm.$invalid) {
                    triggerTouched($scope.employeeForm);
                } else {
                    employeeModel.saveEmployee($scope.employee).then(function(employee) {
                        $scope.employee = employee;
                    });
                }
            };

            $scope.customer = {
                name: null,
                email: null
            };

            $scope.sendNotification = function() {

                if ($scope.notificationForm.$invalid) {
                    triggerTouched($scope.notificationForm);
                }
            };

        }]);

}(angular));
