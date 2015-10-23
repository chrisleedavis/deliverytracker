(function(angular) {
    "use strict";

    angular.module("dtModels").factory("dtNotificationModel", ["dtNotificationService", "$q",
        function(notificationService, $q) {

            var Model = function() {
                return this;
            };

            Model.prototype.sendNotification = function(notification) {

                var self = this,
                    defer = $q.defer();

                notificationService.save(notification, function(data) {

                        self.notification = data.d;
                        defer.resolve(self.notification);
                    },
                    function(errorResponse) {

                        defer.reject(errorResponse);

                    });

                return defer.promise;
            };

            return new Model();

        }]);

}(angular));
