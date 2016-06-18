(function(angular) {
    "use strict";

    angular.module("dtApp")
        .controller("NotificationsCtrl", ["$scope", "dtEmployeeModel", "dtRouteModel", "dtNotificationModel", "dtAlertService",
            function($scope, employeeModel, routeModel, notificationModel, alertService) {

                var initializeState = function() {
                        $scope.notification = {
                            customer: null,
                            email: null,
                            employeeId: null,
                            routeId: null
                        };
                    },
                    getRoutes = function() {
                        routeModel.getRoutes().then(function(routes) {
                            $scope.routes = routes;
                            _.each($scope.routes, function(route) {
                                var employee = _.find($scope.employees, { _id: route.employeeId });
                                if (employee) {
                                    route.driver = employee.firstName + " " + employee.lastName;
                                }
                            });
                        });
                    },
                    getEmployees = function() {
                        employeeModel.getEmployees().then(function(employees) {
                            $scope.employees = employees;
                            getRoutes();
                        });
                    };

                initializeState();
                getEmployees();

                $scope.notify = function() {
                    notificationModel.sendNotification($scope.notification).then(function() {
                        initializeState();
                        alertService.showSuccessWithAutoClear("You successfully sent the notification");
                    });
                };

        }]);

}(angular));
