(function (angular) {
    "use strict";

    angular.module("dtServices").factory("dtAlertService", ["$rootScope",
        function ($rootScope) {

            var alertTypes = {
                    error: { style: "alert-danger", label: "Error" },
                    warning: { style: "alert-warning", label: "Warning" },
                    success: { style: "alert-success", label: "Success" },
                    info: { style: "alert-info", label: "Information" },
                },
                createAlert = function (options) {
                    return {
                        label: alertTypes[options.type].label,
                        style: alertTypes[options.type].style,
                        message: options.message,
                        useTimeout: options.useTimeout,
                        additionalInfo: options.additionalInfo
                    };
                },
                broadcastAlert = function (alert) {
                    $rootScope.$broadcast("showAlert", alert);
                };

            return {
                showInfo: function (message, additionalInfo) {
                    var alert = createAlert({ type: "info", message: message, additionalInfo: additionalInfo });
                    broadcastAlert(alert);
                },
                showWarning: function (message, additionalInfo) {
                    var alert = createAlert({ type: "warning", message: message, additionalInfo: additionalInfo });
                    broadcastAlert(alert);
                },
                showError: function (message, additionalInfo) {
                    var alert = createAlert({ type: "error", message: message, additionalInfo: additionalInfo });
                    broadcastAlert(alert);
                },
                showSuccess: function (message, additionalInfo) {
                    var alert = createAlert({ type: "success", message: message, additionalInfo: additionalInfo });
                    broadcastAlert(alert);
                },
                showSuccessWithAutoClear: function (message, additionalInfo) {
                    var alert = createAlert({ type: "success", message: message, useTimeout: true, additionalInfo: additionalInfo });
                    broadcastAlert(alert);
                },
                showAlert: function (alert) {
                    broadcastAlert(alert);
                },
                clearAlert: function () {
                    $rootScope.$broadcast("clearAlert");
                }
            };
        }]);

}(angular));