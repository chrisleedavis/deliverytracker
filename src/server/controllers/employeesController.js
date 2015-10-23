let _ = require("lodash"),
    Employee = require("../models/employeeModel"),
    employees = [],
    sendResponse = function(response, data) {
        response.send({ d: data });
    };

class EmployeeController {

    addEmployee(request, response) {
        let employee = new Employee(request.body);

        console.log("Adding employee");

        employee.id = employees.length + 1;
        employees.push(employee);

        sendResponse(response, employee);
    }

    findAllEmployees(request, response) {
        console.log("Getting all employees");

        sendResponse(response, employees);
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

module.exports = EmployeeController;
