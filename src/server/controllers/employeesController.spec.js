"use strict";

describe("Employees Controller Tests", () => {

    let mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache"),
        employeeQueue = [];

    beforeEach(() => {

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../config/config", {
            databaseProvider: "default"
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should add/get employees properly", () => {
        let EmployeesController = require("./employeesController"),
            employees = new EmployeesController(),
            employee = { employeeNumber: "1234XL", firstName: "Ted", lastName: "Tester" },
            request = { body: employee },
            response = { send: function(data) { employeeQueue.push(data); } };

        employees.addEmployee(request, response);

        expect(employeeQueue.length).toEqual(1);
        expect(employeeQueue[0].d.employeeNumber).toEqual(employee.employeeNumber);

        employees.findAllEmployees(request, response);
        expect(employeeQueue.length).toEqual(2);
        expect(employeeQueue[0].d.employeeNumber).toEqual(employee.employeeNumber);
    });

});

