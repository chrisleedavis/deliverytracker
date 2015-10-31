"use strict";

describe("Employee Model Tests", () => {

    let Employee = require("./employeeModel");

    it("should hydrate the class properly with constructor", () => {

        let data = {
                employeeNumber: "AC12345",
                firstName: "Joe",
                lastName: "User",
                image: "base64TestImage"
            },
            employee = new Employee(data);

        expect(data.employeeNumber).toEqual(employee.employeeNumber);
        expect(data.firstName).toEqual(employee.firstName);
        expect(data.lastName).toEqual(employee.lastName);
        expect(data.image).toEqual(employee.image);
        expect("Joe User").toEqual(employee.fullName);
    });

});
