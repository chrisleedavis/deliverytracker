class Notification {

    constructor(data) {
        this.customer = data.customer;
        this.email = data.email;
        this.employeeId = data.employeeId;
    }

    sendNotification(employee) {
        console.log("notification sent");
        console.log(employee);
        console.log(this);
    }
}

module.exports = Notification;

