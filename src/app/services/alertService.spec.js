(function () {
    "use strict";

    var service,
        $rootScope,
        message,
        getAlertObject = function(style, label, useTimeout) {
            return {
                style: style,
                label: label,
                message: message,
                useTimeout: useTimeout,
                additionalInfo: undefined
            };
        };

    beforeEach(module("dtServices"));

    describe("Alert Service Tests", function () {

        beforeEach(inject(function (dtAlertService, _$rootScope_) {
            service = dtAlertService;
            $rootScope = _$rootScope_;
            message = "foo bar test";
        }));

        it("should showInfo properly while broadcasting the alert", function () {

            spyOn($rootScope, "$broadcast").and.callThrough();

            service.showInfo(message);

            expect($rootScope.$broadcast).toHaveBeenCalledWith("showAlert", getAlertObject("alert-info", "Information"));
        });

        it("should showWarning properly while broadcasting the alert", function () {

            spyOn($rootScope, "$broadcast").and.callThrough();

            service.showWarning(message);

            expect($rootScope.$broadcast).toHaveBeenCalledWith("showAlert", getAlertObject("alert-warning", "Warning"));
        });

        it("should showError properly while broadcasting the alert", function () {

            spyOn($rootScope, "$broadcast").and.callThrough();

            service.showError(message);

            expect($rootScope.$broadcast).toHaveBeenCalledWith("showAlert", getAlertObject("alert-danger", "Error"));
        });

        it("should showSuccess properly while broadcasting the alert", function () {

            spyOn($rootScope, "$broadcast").and.callThrough();

            service.showSuccess(message);

            expect($rootScope.$broadcast).toHaveBeenCalledWith("showAlert", getAlertObject("alert-success", "Success"));
        });

        it("should showSuccessWithAutoClear properly while broadcasting the alert", function () {

            spyOn($rootScope, "$broadcast").and.callThrough();

            service.showSuccessWithAutoClear(message);

            expect($rootScope.$broadcast).toHaveBeenCalledWith("showAlert", getAlertObject("alert-success", "Success", true));
        });

        it("should showAlert properly while broadcasting the alert", function () {

            var customAlert = {
                label: "foo",
                style: "bar",
                message: message,
                useTimeout: false
            };

            spyOn($rootScope, "$broadcast").and.callThrough();

            service.showAlert(customAlert);

            expect($rootScope.$broadcast).toHaveBeenCalledWith("showAlert", customAlert);
        });

        it("should clearAlert properly while broadcasting the alert", function () {

            spyOn($rootScope, "$broadcast").and.callThrough();

            service.clearAlert();

            expect($rootScope.$broadcast).toHaveBeenCalledWith("clearAlert");
        });
    });

}());