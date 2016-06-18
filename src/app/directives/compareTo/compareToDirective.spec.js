(function () {
    "use strict";

    var $rootScope,
        $compile,
        element,
        form;

    //assert that when passwords don't match, warning is shown
    //assert the warning text is correct
    beforeEach(module("dtDirectives"));

    describe("Compare To Directive Tests", function () {

        beforeEach(inject(function (_$rootScope_, _$compile_) {

            //leverage ng built-in functionality to strip underscores from services to keep references clean within test
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $rootScope.register = { 
                passwd: 1234,
                passwdCon: null
            };
            element = angular.element(
                '<form name="form">' + 
                    '<input data-ng-model="register.passwdCon" name="passwdCon" dt-compare-to="register.passwd" />' +
                '</form>');


            element = $compile(element)($rootScope);
            form = $rootScope.form;
            // $rootScope.$digest();

        }));

        
        it('should show warning when passwords don\'t match', function() {
            form.passwdCon.$setViewValue(6789);
            // element.find('input').val(1234);
            $rootScope.$digest();
            // console.log(form.passwdCon.$invalid);
            expect(form.passwdCon.$invalid).toBe(true);
        });

        it('should not show a warning if the passwords match', function() {
            form.passwdCon.$setViewValue(1234);
            // element.find('input').val(1234);
            $rootScope.$digest();
            // console.log(form.passwdCon.$valid);
            expect(form.passwdCon.$valid).toBe(true);
        });
    });

}());