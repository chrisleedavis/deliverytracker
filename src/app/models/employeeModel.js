(function(angular) {
    "use strict";

    angular.module("dtModels").factory("dtEmployeeModel", ["dtEmployeeService", "$q",
        function(employeeService, $q) {

            var Model = function() {
                return this;
            };

            Model.prototype.getEmployees = function() {

                var self = this,
                    defer = $q.defer();

                employeeService.get({}, function(employees) {

                        self.employees = employees.d;
                        defer.resolve(self.employees);
                    });

                return defer.promise;
            };

            Model.prototype.saveEmployee = function(employee) {

                var self = this,
                    defer = $q.defer(),
                    saveOperation = employee._id && employee._id > 0 ? "update" : "save";

                employeeService[saveOperation](employee, function(data) {

                        self.employee = data.d;
                        defer.resolve(self.employee);
                    });

                return defer.promise;
            };

            return new Model();

        }]);

}(angular));
