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

            routes = [
                { routeNumber: "543KL", employeeId: "432" },
                { routeNumber: "HY432L", employeeId: "5421" },
                { routeNumber: "BG4322", employeeId: "765" },
                { routeNumber: "543LL8", employeeId: "KLL2348JJ" }
            ];
            employees = [
                { _id: "432", firstName: "test", lastName: "me" },
                { _id: "765", firstName: "foo", lastName: "bar" },
                { _id: "5421", firstName: "woo", lastName: "hoo" }
            ];
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
            expect($rootScope.employees).toEqual(employees);
            expect($rootScope.routes.length).toEqual(4);
            expect($rootScope.routes[0].driver).toEqual("test me");
            expect($rootScope.routes[1].driver).toEqual("woo hoo");
            expect($rootScope.routes[2].driver).toEqual("foo bar");
            expect($rootScope.routes[3].driver).toBeUndefined();
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
