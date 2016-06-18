(function () {
    "use strict";

    var $rootScope,
        notifications;

    beforeEach(module("dtApp"));

    describe("History Controller Tests", function () {

        beforeEach(inject(function (_$controller_, _$rootScope_) {

            var mockNotificationModel = {
                getNotifications: function() {
                    return {
                        then: function (fn) {
                            fn(notifications);
                        }
                    };
                }
            };

            notifications = [{ id: 234, test: "foo" }, { id: 222, test: "bar" }, { id: 111, test: "me" }];

            $rootScope = _$rootScope_;
            _$controller_("HistoryCtrl", { $scope: $rootScope, dtNotificationModel: mockNotificationModel });

        }));

        it("successfully get notifications from server", function() {

            expect($rootScope.notifications.length).toEqual(3);
            expect($rootScope.notifications[1].id).toEqual(222);
        });

    });

}());