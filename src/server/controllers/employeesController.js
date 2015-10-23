let _ = require("lodash"),
    responseHelper = require("./responseHelper"),
    Employee = require("../models/employeeModel"),
    employees = [];

class EmployeesController {

    __findEmployee(id) {
        return _.find(employees, { id: id });
    }

    addEmployee(request, response) {
        let employee = new Employee(request.body);

        console.log("Adding employee");

        employee.id = employees.length + 1;
        employees.push(employee);

        responseHelper.sendResponse(response, employee);
    }

    findAllEmployees(request, response) {
        console.log("Getting all employees");

        responseHelper.sendResponse(response, employees);
    }

    findEmployee(request, response) {
        //todo: implementation
    }

    updateEmployee(request, response) {
        //todo: implementation
    }

    deleteEmployee(request, response) {
        //todo: implementation
    }
}

module.exports = EmployeesController;
