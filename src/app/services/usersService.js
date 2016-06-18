(function(angular) {
    "use strict";

    angular.module("dtServices").factory("dtUsersService", ["dtResourceService",
        function(resourceService) {
            return resourceService("users", { }, {});
        }]);

}(angular));
