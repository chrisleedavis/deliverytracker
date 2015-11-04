"use strict";

describe("Employee Model Tests", () => {

    it("should create schema properly", () => {

        let Employee = require("./employeeModel"),
            data = { employeeNumber: "X2e42", firstName: "test", lastName: "me", image: "blah" },
            employee = new Employee(data);

        expect(employee.employeeNumber).toEqual(data.employeeNumber);
        expect(employee.firstName).toEqual(data.firstName);
        expect(employee.lastName).toEqual(data.lastName);
        expect(employee.image).toEqual(data.image);
    });

});
