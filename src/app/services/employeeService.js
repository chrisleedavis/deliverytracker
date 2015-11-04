(function(angular) {
    "use strict";

    angular.module("dtServices").factory("dtEmployeeService", ["dtResourceService",
        function(resourceService) {
            return resourceService("api/employees/:id", { id: "@_id" }, {});
        }]);

}(angular));
