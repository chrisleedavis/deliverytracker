(function () {
    "use strict";

    var $rootScope,
        routes,
        employees,
        assertCleanNotification = function() {
            expect($rootScope.notification.customer).toBeNull();
            expect($rootScope.notification.email).toBeNull();
            expect($rootScope.notification.employeeId).toBeNull();
            expect($rootScope.notification.routeId).toBeNull();
        };

    beforeEach(module("dtApp"));

    describe("Notifications Controller Tests", function () {

        beforeEach(inject(function (_$controller_, _$rootScope_) {

            var mockNotificationModel = {
                    sendNotification: function(notification) {
                        return {
                            then: function (fn) {
                                fn(notification);
                            }
                        };
                    }
                },
                mockEmployeeModel = {
                    getEmployees: function() {
                        return {
                            then: function (fn) {
                                fn(employees);
                            }
                        };
                    }
                },
                mockRouteModel = {
                    getRoutes: function() {
                        return {
                            then: function (fn) {
                                fn(routes);
                            }
                        };
                    }
                };

            routes = [];
            employees = [];
            $rootScope = _$rootScope_;
            _$controller_("NotificationsCtrl", {
                $scope: $rootScope,
                dtNotificationModel: mockNotificationModel,
                dtEmployeeModel: mockEmployeeModel,
                dtRouteModel: mockRouteModel
            });

        }));

        it("should setup the controller state appropriately", function() {

            assertCleanNotification();
            expect($rootScope.routes).toEqual(routes);
            expect($rootScope.employees).toEqual(employees);
        });

        it("should send notification appropriately", function() {

            $rootScope.notification = {
                customer: "test customer",
                email: "test@customer.com",
                employeeId: "12354",
                routeId: "54353"
            };

            $rootScope.notify();

            assertCleanNotification();

        });

    });

}());
