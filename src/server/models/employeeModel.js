class Employee {

    constructor(data) {
        this.employeeNumber = data.employeeNumber;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.image = data.image;
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}

module.exports = Employee;
