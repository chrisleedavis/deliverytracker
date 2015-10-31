"use strict";

let _ = require("lodash"),
    Db = require("../dao/dbFactory"),
    database = Db.instance(),
    responseHelper = require("./responseHelper"),
    Notification = require("../models/notificationModel");

class NotificationsController {

    sendNotification(request, response) {
        let notification = new Notification(request.body);

        database.read("employees", { _id: notification.employeeId }, (employees) => {

            if (employees.length && employees[0]) {
                notification.sendNotification(employees[0]);
                database.create("notifications", notification, (note) => {
                    responseHelper.sendResponse(response, note);
                });
            } else {
                notification.messages.errors.push("employee not found: " + notification.employeeId);
                responseHelper.sendResponse(response, notification);
            }
        });
    }

    findAllNotifications(request, response) {

        let callback = (notifications) => {
            responseHelper.sendResponse(response, notifications);
        };

        database.read("notifications", {}, callback);
    }
}

module.exports = NotificationsController;

