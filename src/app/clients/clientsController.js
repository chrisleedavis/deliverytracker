(function(angular) {
    "use strict";

    angular.module("dtApp")
        .controller("ClientsCtrl",
        ["$scope", "dtEmployeeModel", "dtNotificationModel", function($scope, employeeModel, notificationModel) {

            var triggerTouched = function(form) {
                    _.each(form.$error, function (field) {
                        _.each(field, function(errorField){
                            errorField.$setTouched();
                        });
                    });
                },
                loadEmployees = function() {
                    employeeModel.getEmployees().then(function(employees) {
                        $scope.employees = employees;
                    });
                };

            $scope.employee = {
                _id: null,
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
                        loadEmployees();
                    });
                }
            };

            $scope.notification = {
                customer: null,
                email: null,
                employeeId: null
            };

            $scope.sendNotification = function() {

                if ($scope.notificationForm.$invalid) {
                    triggerTouched($scope.notificationForm);
                } else {
                    notificationModel.sendNotification($scope.notification).then(function(notification) {
                        $scope.notification = notification;
                    });
                }
            };

            loadEmployees();

        }]);

}(angular));
