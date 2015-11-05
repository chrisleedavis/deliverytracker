"use strict";

describe("Employees Controller Tests", () => {

    let _ = require("lodash"),
        mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache"),
        employee,
        employeeQueue,
        error;

    beforeEach(() => {

        error = undefined;
        employee = { employeeNumber: "1234XL", firstName: "Ted", lastName: "Tester" };
        employeeQueue = [];

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("../models/employeeModel", class {

            constructor(data) {
                _.assign(this, data);
            }

            save() {
                return {
                    then: (fn) => {

                        fn(employee);

                        return {
                            "catch": (fn) => {

                                if (error)  {
                                    fn({});
                                }
                            }
                        };
                    }
                };
            }

            static find(searchObj) {
                return {
                    exec: () => {
                        return {
                            then: (fn) => {

                                const employees = [{ firstName: "test", lastName: "me" }, { firstName: "foo", lastName: "bar" }];
                                fn(employees);

                                return {
                                    "catch": (fn) => {

                                        if (error)  {
                                            fn({});
                                        }
                                    }
                                };
                            }
                        };
                    }
                };
            }
        });

        mockery.registerMock("../logger", {
            instance: () => {
                return {
                    error: _.noop
                };
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should add/get employees properly", () => {
        let EmployeesController = require("./employeesController"),
            employees = new EmployeesController(),
            request = { body: employee, user: { _id: 2 } },
            response = { send: function(data) { employeeQueue.push(data); } };

        employees.addEmployee(request, response);

        expect(employeeQueue.length).toEqual(1);
        expect(employeeQueue[0].d.employeeNumber).toEqual(employee.employeeNumber);

        employees.findAllEmployees(request, response);
        expect(employeeQueue.length).toEqual(2);
        expect(employeeQueue[0].d.employeeNumber).toEqual(employee.employeeNumber);
    });

    it("should send error when attempting to add/get employees", () => {
        let EmployeesController = require("./employeesController"),
            employees = new EmployeesController(),
            request = { body: employee, user: { _id: 2 } },
            response = { send: function(data) { employeeQueue.push(data); } };

        const errorMessage = "An error occurred.  Please contact the system administrator.";

        error = true;
        employees.addEmployee(request, response);

        expect(employeeQueue.length).toEqual(2);
        expect(employeeQueue[1].d.error).toEqual(errorMessage);

        employees.findAllEmployees(request, response);
        expect(employeeQueue.length).toEqual(4);
        expect(employeeQueue[3].d.error).toEqual(errorMessage);
    });

});

