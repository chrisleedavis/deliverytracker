(function () {
    "use strict";

    var $location,
        $rootScope,
        $window,
        data,
        model;

    beforeEach(module("dtModels"));

    describe("Emit Login Model Tests", function () {

        beforeEach(function () {

            inject(function (dtEmitLoginModel, _$location_, _$window_, _$rootScope_) {
                $location = _$location_;
                $window = _$window_;
                $rootScope = _$rootScope_;
                model = dtEmitLoginModel;
                data = { d: 123 };

                spyOn($location, 'path');
                spyOn($rootScope, '$emit');
            });
        });

        it("emit login properly", function () {
            //is sessionStorage.token set properly?
            model.emitLogin($rootScope, data);
            expect($window.sessionStorage.token).toEqual('123');
            //is location path set properly?
            expect($location.path).toHaveBeenCalledWith('/');
            //did $emit login happen?
            expect($rootScope.$emit).toHaveBeenCalledWith('login');
        });

    });

}());