"use strict";

let BaseController = require("./baseController"),
    Employee = require("../models/employeeModel");

class EmployeesController extends BaseController {

    constructor() {
        super();
    }

    addEmployee(request, response) {

        let employee = new Employee(request.body);

        employee.save()
            .then((e) => {
                super.handleResponse(response, e);
            })
            .catch((err) => {
                super.handleError(response, err);
            });
    }

    findAllEmployees(request, response) {

        Employee.find({}).exec()
            .then((employees) => {
                super.handleResponse(response, employees);
            })
            .catch((err) => {
                super.handleError(response, err);
            });
    }
}

module.exports = EmployeesController;
