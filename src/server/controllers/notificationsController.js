let _ = require("lodash"),
    responseHelper = require("./responseHelper"),
    Notification = require("../models/notificationModel"),
    EmployeesController = require("./employeesController"),
    employees = new EmployeesController();

class NotificationsController {

    sendNotification(request, response) {
        let notification = new Notification(request.body),
            employee = employees.__findEmployee(notification.employeeId);

        console.log("Sending notification to customer");

        notification.sendNotification(employee);

        responseHelper.sendResponse(response, notification);
    }
}

module.exports = NotificationsController;

