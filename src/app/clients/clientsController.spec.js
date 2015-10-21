(function () {
    "use strict";

    var $controller,
        $rootScope;

    beforeEach(module("dtApp"));

    describe("Clients Controller Tests", function () {

        beforeEach(inject(function (_$controller_, _$rootScope_) {

            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $controller("ClientsCtrl", { $scope: $rootScope });

        }));

        it("message set successfully", function () {

            expect($rootScope.message).toEqual("future home of Clients functionality");

        });

    });

}());
