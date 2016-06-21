(function () {
    "use strict";

    var $rootScope,
        $window,
        $httpBackend,
        $timeout,
<<<<<<< HEAD
        token;
=======
        token = "blahFooBar";
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba

    beforeEach(module("dtApp"));

    describe("Login Controller Tests", function () {

        beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$httpBackend_, _$timeout_) {

            $rootScope = _$rootScope_;
            $window = _$window_;
            $httpBackend = _$httpBackend_;
            $timeout = _$timeout_;
<<<<<<< HEAD
            token = "blahFooBar";
=======
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba
            $controller("LoginCtrl", { $scope: $rootScope });
        }));

        it("successfully setup login object", function () {

            expect($rootScope.login.username).toBeNull();
            expect($rootScope.login.password).toBeNull();
        });

        it("successfully successfully handle login from server", function () {

            $httpBackend.when("POST", "login").respond({ d: token });

            $rootScope.performLogin().then(function() {
                expect($window.sessionStorage.token).toEqual(token);
            });

            $httpBackend.flush();
            $timeout.flush();
        });

        it("successfully successfully handle login from server when failure occurs", function () {

            $httpBackend.when("POST", "login").respond(500);

            expect($window.sessionStorage.token).toEqual(token);

            $rootScope.performLogin();

            $httpBackend.flush();
            $timeout.flush();

            expect($window.sessionStorage.token).toBeUndefined();
        });

    });

}());
