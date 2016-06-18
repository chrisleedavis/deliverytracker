//not using resourceService to avoid circular dependency via $http & resourceService
(function(angular) {
    "use strict";

    angular.module("dtServices").factory("dtLogService", ["$window", function($window) {
            return {
                save: function(log) {
                    var request = new XMLHttpRequest();
                    request.open("post", "api/logs", true);
                    request.setRequestHeader("Content-Type", "application/json");
                    request.setRequestHeader("Authorization", "Bearer " + $window.sessionStorage.token);
                    request.send(JSON.stringify(log));
                }
            };
        }]);

}(angular));
