(function(angular) {
    "use strict";

    angular.module("dtServices").factory("dtLoginService", ["dtResourceService",
        function(resourceService) {
            return resourceService("login", { }, {});
        }]);

}(angular));
