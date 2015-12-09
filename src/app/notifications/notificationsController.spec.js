(function () {
    "use strict";

    var $rootScope;

    beforeEach(module("dtApp"));

    describe("Notifications Controller Tests", function () {

        beforeEach(inject(function (_$controller_, _$rootScope_) {

            $rootScope = _$rootScope_;
            _$controller_("NotificationsCtrl", { $scope: $rootScope });

        }));

        it("should create the default message correctly", function() {

            expect($rootScope.message).toEqual("Coming soon...");
        });

    });

}());
