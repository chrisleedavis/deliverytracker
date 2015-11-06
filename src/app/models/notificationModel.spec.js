(function () {
    "use strict";

    var model,
        timeout,
        httpMock;

    beforeEach(module("dtModels"));

    describe("Notification Model Tests", function () {

        beforeEach(function () {

            inject(function (dtNotificationModel, $timeout, $httpBackend) {
                model = dtNotificationModel;
                timeout = $timeout;
                httpMock = $httpBackend;
            });
        });

        it("should send notification appropriately from API", function () {

            var notification = { foo: "bar"};

            httpMock.when("POST", "api/notifications").respond({ d: notification });

            model.sendNotification(notification).then(function (note) {

                expect(notification).toEqual(note);
            });

            httpMock.flush();
            timeout.flush();

        });

        it("should handle error properly if send notification fails from API", function() {

            var error = { data: 500 }, notification = { foo: "bar"};
            httpMock.when("POST", "api/notifications").respond(error);

            model.sendNotification(notification).catch(function (err) {

                expect(err.status).toEqual(error.data);
            });

            httpMock.flush();
            timeout.flush();
        });

        it("should load notifications appropriately from API", function () {

            var notifications = [{ id: 324, test: "me" }, { id: 213, test: "foo" }, { id: 777, test: "bar" }];
            httpMock.when("GET", "api/notifications").respond({ d: notifications });

            model.getNotifications().then(function (notificationList) {

                expect(notificationList).toEqual(notifications);
            });

            httpMock.flush();
            timeout.flush();

        });

        it("should handle error properly if load notifications fails from API", function() {

            var error = { data: 500 };
            httpMock.when("GET", "api/notifications").respond(error);

            model.getNotifications().catch(function (err) {

                expect(err.status).toEqual(error.data);
            });

            httpMock.flush();
            timeout.flush();
        });

    });

}());