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

            var error = 500, notification = { foo: "bar"};
            httpMock.when("POST", "api/notifications").respond(error);

            model.sendNotification(notification).catch(function (err) {

                expect(err.status).toEqual(error);
            });

            httpMock.flush();
            timeout.flush();
        });

    });

}());