"use strict";

describe("Notification Model Tests", () => {

    it("should create schema properly & implement pre save functionality appropriately", () => {

        let Notification = require("./notificationModel"),
            data = {customer: "foo", email: "bar@test.com", employeeId: "23"},
            notification = new Notification(data);

        expect(notification.customer).toEqual(data.customer);
        expect(notification.email).toEqual(data.email);
        expect(notification.employeeId).toEqual(data.employeeId);
    });

});


