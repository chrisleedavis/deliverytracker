(function () {
    "use strict";

    var service,
        $rootScope,
        $window,
        mockWindow,
        resizeFn,
        httpMock;

    beforeEach(module("dtServices"));

    describe("Media Query Service Tests", function () {

        beforeEach(inject(function (dtMediaQueryService, _$rootScope_, _$window_) {
            service = dtMediaQueryService;
            $rootScope = _$rootScope_;
            $window = _$window_;

            //mock required for resize event simulation (http://wintellect.com/blogs/dbaskin/angularjs-mvc-cookbook-unit-testing)
            spyOn(angular, "element").and.callFake(function () {

                mockWindow = jasmine.createSpy("windowElement");

                mockWindow.bind = jasmine.createSpy("bind").and.callFake(function (evt, fn) {
                    resizeFn = fn;
                });

                mockWindow.unbind = jasmine.createSpy("unbind");
                mockWindow.off = jasmine.createSpy("off"); //required for injector.get('$rootElement').off() ERROR

                return mockWindow;
            });

            $window.innerWidth = 700;

            service.init();

        }));

        it("should set flags successfully @ 700 width", function () {

            expect($rootScope.isXSmall).toBeTruthy();
            expect($rootScope.isSmall).not.toBeTruthy();
            expect($rootScope.isMedium).not.toBeTruthy();
            expect($rootScope.isLarge).not.toBeTruthy();
        });

        it("should set flags successfully @ 900 width", function () {

            $window.innerWidth = 900;
            resizeFn();

            expect($rootScope.isXSmall).not.toBeTruthy();
            expect($rootScope.isSmall).toBeTruthy();
            expect($rootScope.isMedium).not.toBeTruthy();
            expect($rootScope.isLarge).not.toBeTruthy();
        });

        it("should set flags successfully @ 1100 width", function () {

            $window.innerWidth = 1100;
            resizeFn();

            expect($rootScope.isXSmall).not.toBeTruthy();
            expect($rootScope.isSmall).not.toBeTruthy();
            expect($rootScope.isMedium).toBeTruthy();
            expect($rootScope.isLarge).not.toBeTruthy();
        });

        it("should set flags successfully @ 1300 width", function () {

            $window.innerWidth = 1300;
            resizeFn();

            expect($rootScope.isXSmall).not.toBeTruthy();
            expect($rootScope.isSmall).not.toBeTruthy();
            expect($rootScope.isMedium).not.toBeTruthy();
            expect($rootScope.isLarge).toBeTruthy();
        });
    });

}());