"use strict";

const BaseController = require("./baseController"),
    Employee = require("../models/employeeModel");

class EmployeesController extends BaseController {

    constructor() {
        super();
    }

    addEmployee(request, response) {

        const employee = new Employee(request.body);

        employee.createdBy = request.user._id;
        employee.save()
            .then((e) => {
                super.handleResponse(response, e);
            })
            .catch((err) => {
                super.handleError(response, err);
            });
    }

    findAllEmployees(request, response) {

        super.findAll(request, response, Employee);
    }
}

module.exports = EmployeesController;
