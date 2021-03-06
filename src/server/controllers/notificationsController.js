"use strict";

const BaseController = require("./baseController"),
    Notification = require("../models/notificationModel"),
    Mailer = require("../models/mailerModel"),
    Employee = require("../models/employeeModel"),
    responseHelper = require("./responseHelper");

class NotificationsController extends BaseController {

    constructor() {
        super();
    }

    sendNotification(request, response) {
        const notification = new Notification(request.body);

        Employee.findById(notification.employeeId)
            .exec()
            .then((employee) => {
                if (employee) {
                    const mailer = new Mailer();
                    mailer.sendNotification(notification, employee);
                    notification.createdBy = request.user._id;
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

        super.findAll(request, response, Notification);
    }
}

module.exports = NotificationsController;

