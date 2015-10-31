"use strict";

let _ = require("lodash"),
    Db = require("../dao/dbFactory"),
    database = Db.instance(),
    responseHelper = require("./responseHelper"),
    Employee = require("../models/employeeModel");

class EmployeesController {

    addEmployee(request, response) {

        let employee = new Employee(request.body),
            callback = (emp) => {
                responseHelper.sendResponse(response, emp);
            };

        database.create("employees", employee, callback);
    }

    findAllEmployees(request, response) {

        let callback = (employees) => {
                responseHelper.sendResponse(response, employees);
            };

        database.read("employees", {}, callback);
    }
}

module.exports = EmployeesController;
