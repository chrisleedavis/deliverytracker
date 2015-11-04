"use strict";

describe("Notification Model Tests", () => {

    it("should create schema properly & implement pre save functionality appropriately", () => {

        let Notification = require("./notificationModel"),
            data = {customer: "foo", email: "bar@test.com", employeeId: "23"},
            notification = new Notification(data),
            created_at;

        expect(notification.customer).toEqual(data.customer);
        expect(notification.email).toEqual(data.email);
        expect(notification.employeeId).toEqual(data.employeeId);
        expect(notification.created_at).toBeUndefined();

        //test created_at set properly
        notification.save().then((note) => {
            created_at = note.created_at;
            expect(created_at).not.toBeUndefined();
        });

        notification.save().then((note) => {
            expect(created_at).toEqual(note.created_at);
        });
    });

});


