(function(angular) {
    "use strict";

    angular.module("dtApp")
        .controller("HistoryCtrl",
        ["$scope", "dtNotificationModel", function($scope, notificationModel) {

            var loadNotifications = function() {
                notificationModel.getNotifications().then(function(notifications) {
                    $scope.notifications = notifications;
                });
            };

            loadNotifications();

        }]);

}(angular));

