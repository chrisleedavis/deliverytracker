(function () {
    "use strict";

    var service,
        $window;

    beforeEach(module("dtServices"));

    describe("Wait Cursor Service Tests", function () {

        beforeEach(function () {

            //mock $window for service
            $window = { document: {}, addEventListener: angular.noop };
            $window.document.getElementById = function () {

                return {
                    style: {
                        display: {}
                    }
                };
            };

            module(function ($provide) {
                $provide.value("$window", $window);
            });

            inject(function (dtWaitCursorService) {
                service = dtWaitCursorService;
            });
        });

        it("should hide spinner appropriately loading element is defined with the style attr", function () {

            service.hideSpinner();
            expect(service._element.style.display).toEqual("none");

        });

        it("should show spinner appropriately loading element is defined with the style attr", function () {

            //mock spinner for test (allow vendor to test itself)
            service._mockSpinner({ spin: angular.noop });
            service.showSpinner();
            expect(service._element.style.display).toEqual("block");

        });

    });

}());
