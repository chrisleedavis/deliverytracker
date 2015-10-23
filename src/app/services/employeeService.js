(function(angular) {
    "use strict";

    angular.module("dtServices").factory("dtEmployeeService", ["dtResourceService",
        function(resourceService) {

            var employeeService =  resourceService("api/employees/:id",
                {
                    id: "@id"
                }, {});

            return employeeService;
        }]);

}(angular));
