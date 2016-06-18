(function () {
    "use strict";

    var $rootScope,
        $window,
        $httpBackend,
        $timeout,
        token;

    beforeEach(module("dtApp"));

    describe("Sign Up Controller Tests", function () {

        beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$httpBackend_, _$timeout_) {

            $rootScope = _$rootScope_;
            $window = _$window_;
            $httpBackend = _$httpBackend_;
            $timeout = _$timeout_;
            token = "blahfoobar";
            $controller("SignUpCtrl", { $scope: $rootScope });
        }));

        // it("successfully setup login object", function () {

        //     expect($rootScope.login.username).toBeNull();
        //     expect($rootScope.login.password).toBeNull();
        // });

        it("successfully successfully handles sign up from server", function () {

            $httpBackend.when("POST", "users").respond({ d: token });

            $rootScope.register().then(function() {
                expect($window.sessionStorage.token).toEqual(token);
            });

            $httpBackend.flush();
            // $timeout.flush();
        });

        it("successfully handle login from server when failure occurs", function () {

            $httpBackend.when("POST", "users").respond(500);

            expect($window.sessionStorage.token).toEqual(token);

            $rootScope.register();

            $httpBackend.flush();
            $timeout.flush();

            expect($window.sessionStorage.token).toBeUndefined();
        });

    });

}());