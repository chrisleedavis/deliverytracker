"use strict";

describe("Notifications Controller Tests", () => {

    let mockery = require("mockery"),
        _ = require("lodash"),
        clearModuleCache = require("../_clearModuleCache"),
        notificationQueue,
        employees;

    beforeEach(() => {

        employees = [ {_id: 56, name: "foo bar"}, {_id: 78, name: "test me"} ];
        notificationQueue = [];

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../config/config", {
            databaseProvider: "default"
        });
        mockery.registerMock("../models/notificationModel", class {
            constructor(data) {
                this.employeeId = data.employeeId;
                this.messages = { errors: [], warnings: [], information: []};
            }
            sendNotification(employee) {
                notificationQueue.push(employee);
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should send notification & get all notifications properly", () => {
        let NotificationsController = require("./notificationsController"),
            DbFactory = require("../dao/dbFactory"),
            database = DbFactory.instance(),
            notifications = new NotificationsController(),
            notification = { employeeId: 78, test: "me" },
            request = { body: notification },
            response = { send: () => { } };

        _.each(employees, (e) => {
           database.create("employees", e, _.noop);
        });
        notifications.sendNotification(request, response);

        expect(notificationQueue.length).toEqual(1);
        expect(notificationQueue[0]).toEqual(employees[1]);

        response.send = (notifications) => { notificationQueue.push(notifications); };
        notifications.findAllNotifications(request, response);

        expect(notificationQueue.length).toEqual(2);
        expect(notificationQueue[1].d[0].employeeId).toEqual(notification.employeeId);
    });

    it("should not send notification and return request back with errors if employee cannot be found", () => {
        let NotificationsController = require("./notificationsController"),
            notifications = new NotificationsController(),
            DbFactory = require("../dao/dbFactory"),
            database = DbFactory.instance(),
            notification = { employeeId: 5435353, test: "me" },
            request = { body: notification },
            response = { send: (n) => { notification = n.d; } };

        _.each(employees, (e) => {
            database.create("employees", e, _.noop);
        });
        notifications.sendNotification(request, response);

        expect(notificationQueue.length).toEqual(0);
        expect(notification.messages.errors.length).toEqual(1);
        expect(notification.messages.errors[0]).toEqual("employee not found: 5435353");
    });

});
