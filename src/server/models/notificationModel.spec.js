"use strict";

describe("Notification Model Tests", () => {

    let mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache"),
        Notification,
        data,
        notification,
        employee,
        mailGunLog,
        emailLog,
        error,
        info;

    beforeEach(() => {

        data = { customer: "Tom Smith", email: "tom.smith@domain.com", employeeId: 3456 };
        employee = { image: "MOCK_IMAGE_NOW" };
        mailGunLog = [];
        emailLog = [];
        error = undefined;

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("nodemailer", { createTransport: () => {
            return {
                sendMail: (mailOptions, fn) => {
                    emailLog.push(mailOptions);
                    fn(error, info);
                }
            };
        } });
        mockery.registerMock("nodemailer-mailgun-transport", (data) => { mailGunLog.push(data); });
        mockery.registerMock("../config/config", { secureTransporter: { auth: "barFoo", sender: "fake@sender.com" }});
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should hydrate the class properly with constructor", () => {

        Notification = require("./notificationModel");
        notification = new Notification(data);

        expect(data.customer).toEqual(notification.customer);
        expect(data.email).toEqual(notification.email);
        expect(data.employeeId).toEqual(notification.employeeId);
    });

    it("should send notification properly", () => {

        info = { response: "it works" };
        Notification = require("./notificationModel");
        notification = new Notification(data);
        notification.sendNotification(employee); //success test
        expect(mailGunLog.length).toEqual(1);
        expect(mailGunLog[0]).toEqual("barFoo");
        expect(emailLog.length).toEqual(1);
        expect(emailLog[0]).toEqual({
            from: "fake@sender.com",
            to: "tom.smith@domain.com",
            subject: "Delivery Notice",
            text: "You have a delivery today.",
            html: '<b>You have a delivery today.</b><img src="MOCK_IMAGE_NOW" alt="Delivery Person" width="150" height="150" />' });
        expect(notification.messages.information.length).toEqual(1);
        expect(notification.messages.information[0]).toEqual(info.response);

        //failure test
        error = "bad thing occurred";
        info = { response: undefined };
        notification.sendNotification(employee); //success test
        expect(notification.messages.errors.length).toEqual(1);
        expect(notification.messages.errors[0]).toEqual(error);
    });
});


