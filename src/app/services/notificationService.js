(function(angular) {
    "use strict";

    angular.module("dtServices").factory("dtNotificationService", ["dtResourceService",
        function(resourceService) {
            return resourceService("api/notifications", {}, {});
        }]);

}(angular));
