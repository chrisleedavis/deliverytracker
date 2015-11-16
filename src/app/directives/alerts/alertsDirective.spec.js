(function () {
    "use strict";

    var element,
        $rootScope,
        $compile,
        $timeout,
        testTemplate,
        alertService,
        message,
        strongEl,
        spanEl,
        buttonCloseEl,
        findElementsInHtml = function () {

            strongEl = angular.element(element.find("strong"));
            spanEl = angular.element(element.find("span")["1"]);
            buttonCloseEl = angular.element(element.find("button"));
        },
        showAlertAndAssertAlertExists = function () {

            alertService.showInfo(message);
            $rootScope.$digest(); //make sure the directive refreshes with new content before assertions

            findElementsInHtml();

            expect(strongEl.text()).toEqual("Information!");
            expect(spanEl.text()).toEqual(message);
        },
        assertAlertWasRemoved = function () {

            $rootScope.$digest(); //make sure the directive refreshes with new content before assertions

            findElementsInHtml();

            expect(_.isEmpty(strongEl)).toBeTruthy();
            expect(_.isEmpty(spanEl)).toBeTruthy();
            expect(_.isEmpty(buttonCloseEl)).toBeTruthy();
        };

    beforeEach(module("dtDirectives"));

    describe("Alert Directive Tests", function () {

        beforeEach(function () {

            testTemplate = '<div><dt-alerts></dt-alerts></div>';
            message = "foo bar test";

            inject(function (_$rootScope_, _$compile_, $templateCache, dtAlertService, _$timeout_) {

                //leverage ng built-in functionality to strip underscores from services to keep references clean within test
                $rootScope = _$rootScope_;
                $compile = _$compile_;
                $timeout = _$timeout_;
                alertService = dtAlertService;

                element = $compile(testTemplate)($rootScope);
                $rootScope.$digest(); //bind models to templates for testing

            });

        });

        it("should load the directive appropriately and handle the showAlert/clearAlert (from close button click) events properly", function () {

            showAlertAndAssertAlertExists();

            //CLEAR ALERT
            buttonCloseEl.triggerHandler("click");
            assertAlertWasRemoved();
        });

        it("should clear the alert directive appropriately when clearAlert is raised from service", function () {

            showAlertAndAssertAlertExists();

            //CLEAR ALERT FROM SERVICE
            alertService.clearAlert();
            assertAlertWasRemoved();
        });

        it("should clear the alert directive automatically when useTimeout is true and 3 seconds has elapsed", function () {

            alertService.showSuccessWithAutoClear(message);
            $rootScope.$digest(); //make sure the directive refreshes with new content before assertions

            findElementsInHtml();

            expect(strongEl.text()).toEqual("Success!");
            expect(spanEl.text()).toEqual(message);

            //CLEAR ALERT FROM TIMEOUT
            $timeout.flush();
            assertAlertWasRemoved();
        });

    });

}());