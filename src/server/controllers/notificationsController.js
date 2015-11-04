"use strict";

let BaseController = require("./baseController"),
    Notification = require("../models/notificationModel"),
    Mailer = require("../models/mailerModel"),
    Employee = require("../models/employeeModel"),
    responseHelper = require("./responseHelper");

class NotificationsController extends BaseController {

    constructor() {
        super();
    }

    sendNotification(request, response) {
        let notification = new Notification(request.body);

        Employee.findById(notification.employeeId)
            .exec()
            .then((employee) => {
                if (employee) {
                    let mailer = new Mailer();
                    mailer.sendNotification(notification, employee);
                    notification.save()
                        .then((n) => {
                            super.handleResponse(response, n);
                        })
                        .catch((err) => {
                            super.handleError(response, err);
                        });
                } else {
                    notification.messages.errors.push("employee not found: " + notification.employeeId);
                    responseHelper.sendResponse(response, notification);
                }
            })
            .catch((err) => {
                super.handleError(response, err);
            });
    }

    findAllNotifications(request, response) {

        Notification.find({}).exec()
            .then((notifications) => {
                super.handleResponse(response, notifications);
            })
            .catch((err) => {
                super.handleError(response, err);
            });
    }
}

module.exports = NotificationsController;

