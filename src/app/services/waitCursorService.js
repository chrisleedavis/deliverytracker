(function (angular) {
    "use strict";

    angular.module("dtServices").factory("dtWaitCursorService", ["$window",
        function ($window) {

            var loadingElement = $window.document.getElementById("loading"),
                options = {
                    lines: 13, // The number of lines to draw
                    length: 10, // The length of each line
                    width: 5, // The line thickness
                    radius: 12, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    color: '#000', // #rgb or #rrggbb or array of colors
                    speed: 1, // Rounds per second
                    trail: 60, // Afterglow percentage
                    top: '50%',
                    left: '50%'
                },
                spinner = new Spinner(options),
                changeSpinner = function (display) {
                    if (loadingElement && loadingElement.style) {
                        loadingElement.style.display = display;
                    }
                };

            return {
                //reference here for testing purposes
                _mockSpinner: function (mock) {
                    spinner = mock;
                },
                //reference here for testing purposes
                _element: loadingElement,

                hideSpinner: function () {
                    changeSpinner("none");
                    spinner.stop();
                },

                showSpinner: function () {
                    changeSpinner("block");
                    spinner.spin(loadingElement);
                },

                isSpinning: function () {
                    return spinner && spinner.el;
                }
            };
        }]);

}(angular));