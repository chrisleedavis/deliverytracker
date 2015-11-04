"use strict";

describe("Notifications Controller Tests", () => {

    let mockery = require("mockery"),
        _ = require("lodash"),
        clearModuleCache = require("../_clearModuleCache"),
        notificationQueue,
        notifications,
        employees,
        error;

    beforeEach(() => {

        notificationQueue = [];
        error = undefined;

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../models/notificationModel", class {
            constructor(data) {
                this.employeeId = data.employeeId;
                this.messages = { errors: [], warnings: [], information: []};
            }

            save() {
                return {
                    then: (fn) => {

                        fn({});

                        return {
                            "catch": (fn) => {
                                fn({});
                            }
                        };
                    }
                };
            }

            static find(searchObj) {

                return {
                    exec: () => {
                        return {
                            then: (fn) => {

                                notifications = [{ _id: "56" }, { _id: "78" }];
                                fn(_.filter(notifications, searchObj));

                                return {
                                    "catch": (fn) => {
                                        fn({});
                                    }
                                };
                            }
                        };
                    }
                };
            }
        });
        mockery.registerMock("../models/mailerModel", class {

            sendNotification(notification, employee) {
                notificationQueue.push({ notification: notification, employee: employee });
            }
        });
        mockery.registerMock("../models/employeeModel", class {

            static findById(_id) {
                return {
                    exec: () => {
                        return {
                            then: (fn) => {

                                employees = [{ _id: "56", firstName: "test", lastName: "me" }, { _id: "78", firstName: "foo", lastName: "bar" }];
                                fn(_.find(employees, { _id: _id }));

                                return {
                                    "catch": (fn) => {

                                        if (error)  {
                                            fn({});
                                        }
                                    }
                                };
                            }
                        };
                    }
                };
            }
        });
        mockery.registerMock("../logger", {
            instance: () => {
                return {
                    error: _.noop
                };
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should send notification & get all notifications properly", () => {
        let NotificationsController = require("./notificationsController"),
            notifications = new NotificationsController(),
            notification = { employeeId: "78", test: "me" },
            request = { body: notification },
            response = { send: () => { } };

        error = true;
        notifications.sendNotification(request, response);

        expect(notificationQueue.length).toEqual(1);
        expect(notificationQueue[0].employee).toEqual(employees[1]);

        response.send = (notifications) => { notificationQueue.push(notifications); };
        notifications.findAllNotifications(request, response);

        expect(notificationQueue.length).toEqual(3);
        expect(notificationQueue[1].d[1]._id).toEqual(notification.employeeId);
    });

    it("should not send notification and return request back with errors if employee cannot be found", () => {
        let NotificationsController = require("./notificationsController"),
            notifications = new NotificationsController(),
            notification = { employeeId: "5435353", test: "me" },
            request = { body: notification },
            response = { send: (n) => { notification = n.d; } };

        notifications.sendNotification(request, response);

        expect(notificationQueue.length).toEqual(0);
        expect(notification.messages.errors.length).toEqual(1);
        expect(notification.messages.errors[0]).toEqual("employee not found: 5435353");
    });

});
