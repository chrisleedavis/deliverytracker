"use strict";

describe("Mailer Model Tests", () => {

    let mockery = require("mockery"),
        _ = require("lodash"),
        clearModuleCache = require("../_clearModuleCache"),
        mailGunLog,
        emailLog,
        error,
        info;

    beforeEach(() => {

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

    it("should send notification properly", () => {

        let Mailer = require("./mailerModel"),
            mailer = new Mailer(),
            notification = { email: "tom.smith@domain.com", messages: { information: [], warnings: [], errors: [] } },
            employee = { image: "MOCK_IMAGE_NOW" };

        info = { response: "it works" };

        mailer.sendNotification(notification, employee);

        expect(mailGunLog.length).toEqual(1);
        expect(mailGunLog[0]).toEqual("barFoo");
        expect(emailLog.length).toEqual(1);
        expect(emailLog[0]).toEqual({
            from: "fake@sender.com",
            to: "tom.smith@domain.com",
            subject: "Delivery Notice",
            text: "",
            html: '<b>You have a delivery today.</b><img src="MOCK_IMAGE_NOW" alt="Delivery Person" width="150" height="150" />' });
        expect(notification.messages.information.length).toEqual(1);
        expect(notification.messages.information[0]).toEqual(info.response);

        //failure test
        error = "bad thing occurred";
        info = { response: undefined };

        mailer.sendNotification(notification, employee);

        expect(notification.messages.errors.length).toEqual(1);
        expect(notification.messages.errors[0]).toEqual(error);
    });
});