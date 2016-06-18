(function () {
    "use strict";

    var model,
        employees,
        timeout,
        httpMock;

    beforeEach(module("dtModels"));

    describe("Employee Model Tests", function () {

        beforeEach(function () {

            employees = [
                { _id: 1, employeeNumber: "X1234", firstName: "Bob", lastName: "Marley", image: "foo"},
                { _id: 2, employeeNumber: "890", firstName: "Richard", lastName: "Nixon", image: "bar"},
                { _id: 3, employeeNumber: "H1231H", firstName: "Mary", lastName: "Hart", image: "test"}
            ];

            inject(function (dtEmployeeModel, $timeout, $httpBackend) {
                model = dtEmployeeModel;
                timeout = $timeout;
                httpMock = $httpBackend;
            });
        });

        it("should load employees appropriately from API", function () {

            httpMock.when("GET", "api/employees").respond({ d: employees });

            model.getEmployees().then(function (employeeList) {

                expect(employeeList).toEqual(employees);
            });

            httpMock.flush();
            timeout.flush();

        });

        it("should create employee appropriately from API", function () {

            var employee = employees[2];
            delete employee._id;

            httpMock.when("POST", "api/employees").respond({ d: employee });

            model.saveEmployee(employee).then(function (emp) {

                expect(employee).toEqual(emp);
            });

            httpMock.flush();
            timeout.flush();

        });

        it("should update employee appropriately from API", function () {

            var employee = employees[2];

            httpMock.when("PUT", "api/employees/3").respond({ d: employee });

            model.saveEmployee(employee).then(function (emp) {

                expect(employee).toEqual(emp);
            });

            httpMock.flush();
            timeout.flush();

        });

    });

}());
