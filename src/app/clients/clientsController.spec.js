(function () {
    "use strict";

    var $rootScope,
        queue,
        raised,
        setupForm = function() {
            return {
                $invalid: true,
                $error: [[{ $setTouched: function() { queue.push(raised); }}]]
            };
        },
        assertTouchEvent = function() {
            expect(queue.length).toEqual(1);
            expect(queue[0]).toEqual(raised);
        };

    beforeEach(module("dtApp"));

    describe("Clients Controller Tests", function () {

        beforeEach(inject(function (_$controller_, _$rootScope_) {

            var mockEmployeeModel = {
                    saveEmployee: function (employee) {
                        return {
                            then: function (fn) {
                                employee.fromServer = true;
                                fn(employee);
                            }
                        };
                    }
                };

            $rootScope = _$rootScope_;
            _$controller_("ClientsCtrl", { $scope: $rootScope, dtEmployeeModel: mockEmployeeModel });

            queue = [];
            raised = "raised";

            //mock FileReader
            FileReader = function() {

                return this;
            };

            FileReader.prototype.onload = angular.noop;
            FileReader.prototype.readAsDataURL = function (file) {

                var e = {
                    target: {
                        result: file
                    }
                };

                this.onload(e);
            };

        }));

        it("successfully raise touch event if employee form is invalid", function () {

            $rootScope.employeeForm = setupForm();
            $rootScope.saveEmployee();
            assertTouchEvent();
        });

        it("successfully raise touch event if notify form is invalid", function () {

            $rootScope.notificationForm = setupForm();
            $rootScope.sendNotification();
            assertTouchEvent();
        });

        it("successfully don't raise touch event if notify form is valid", function () {

            $rootScope.notificationForm = {$invalid: false};
            $rootScope.sendNotification();
            expect(queue.length).toEqual(0);
        });

        it("successfully updates employee from server with saveEmployee call", function() {

            var employee = { foo: "bar" };
            $rootScope.employee = employee;
            $rootScope.employeeForm = { $invalid: false };

            expect($rootScope.employee.fromServer).not.toBeTruthy();
            $rootScope.saveEmployee();
            expect($rootScope.employee.fromServer).toBeTruthy();
        });

        it("should not set employee.image if there's no file present", function() {

            var file = null;
            $rootScope.uploadImage(file);
            expect($rootScope.employee.image).toBeNull();

        });

        it("should set employee.image if file present", function() {

            var file = "fooBar";
            $rootScope.uploadImage(file);
            expect($rootScope.employee.image).toEqual(file);

        });

    });

}());
