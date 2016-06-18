(function(angular) {
    "use strict";

    angular.module("dtServices").factory("dtRouteService", ["dtResourceService",
        function(resourceService) {
            return resourceService("api/routes/:id", { id: "@_id" }, {});
        }]);

}(angular));

