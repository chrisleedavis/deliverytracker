"use strict";

describe("Default Db Tests", () => {

    let DefaultDb = require("./defaultDb"),
        _ = require("lodash"),
        defaultDb,
        employees;

    beforeEach(() => {
        defaultDb = new DefaultDb();
        employees = [
            { firstName: "John", lastName: "Smith" },
            { firstName: "John", lastName: "Doe" },
            { firstName: "John", lastName: "Peters" },
            { firstName: "Bob", lastName: "Smith" }];

        _.forEach(employees, (employee) => {
            defaultDb.create("employees", employee, _.noop);
        });
    });

    it("should throw error if attempting CRUD for a collection that doesn't exist", () => {

        try {
            defaultDb.create("foo", {});
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Collection not found in database: foo");
        }

        try {
            defaultDb.read("foo", {});
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Collection not found in database: foo");
        }

        try {
            defaultDb.update("foo", {});
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Collection not found in database: foo");
        }

        try {
            defaultDb.delete("foo", {});
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Collection not found in database: foo");
        }
    });

    it("should throw error if attempting to create/update with undefined object", () => {

        try {
            defaultDb.create("employees", undefined);
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Object must be defined");
        }

        try {
            defaultDb.update("notifications", null);
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Object must be defined");
        }

    });

    it("should create new object properly into the database", () => {

        let expected = { id: 3, firstName: "Test", lastName: "Me" };

        defaultDb.create("employees", expected, _.noop);
        defaultDb.read("employees", expected, (found) => {
            expect(found.length).toEqual(1);
            expect(expected).toEqual(found[0]);
        });
    });

    it("should read properly from the database", () => {

        defaultDb.read("employees", { firstName: "John" }, (findings) => {
            expect(findings.length).toEqual(3);
            expect(findings[0]).toEqual(employees[0]);
            expect(findings[2]).toEqual(employees[2]);
        });
    });

    it("should update properly when object is found", () => {

        let searchObj = { id: 3 },
            updatedObj = { id: 3, firstName: "Alex", lastName: "Robinson" };

        defaultDb.update("employees", searchObj, updatedObj, _.noop);
        defaultDb.read("employees", searchObj, (found) => {
            expect(found[0]).toEqual(updatedObj);
        });
    });

    it("should not update anything if object not found", () => {

        let searchObj = { id: 3543 },
            updatedObj = { id: 3, firstName: "Alex", lastName: "Robinson" };

        defaultDb.update("employees", searchObj, updatedObj, _.noop);
        defaultDb.read("employees", {}, (found) => {
            expect(found).toEqual(employees);
        });
    });

    it("should delete properly", () => {

        let searchObj = { id: 3 };

        defaultDb.delete("employees", searchObj);
        defaultDb.read("employees", {}, (employees) => {
            expect(employees.length).toEqual(3);
            expect(_.find(employees, searchObj)).toBeUndefined();
        });
    });

});
