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
                    });

                return defer.promise;
            };

            Model.prototype.getNotifications = function() {

                var self = this,
                    defer = $q.defer();

                notificationService.get({}, function(notifications) {

                        self.notifications = notifications.d;
                        defer.resolve(self.notifications);
                    });

                return defer.promise;

            };

            return new Model();

        }]);

}(angular));
