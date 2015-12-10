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
                        });
                    },
                    getEmployees = function() {
                        employeeModel.getEmployees().then(function(employees) {
                            $scope.employees = employees;
                        });
                    };

                initializeState();
                getRoutes();
                getEmployees();

                $scope.notify = function() {
                    notificationModel.sendNotification($scope.notification).then(function() {
                        initializeState();
                        alertService.showSuccessWithAutoClear("You successfully sent the notification");
                    });
                };

        }]);

}(angular));
