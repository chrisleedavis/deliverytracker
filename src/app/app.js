(function(angular) {
    "use strict";

    angular.module("dtApp",
        ["ngSanitize", "dtTemplates", "ngMaterial", "ngRoute", "ngMessages", "ngFileUpload", "dtServices", "dtModels", "dtDirectives"])
        .config(["$routeProvider", "$mdThemingProvider", function($routeProvider, $mdThemingProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "/templates/home/_home.html"
                })
                .when("/:directory/:page", {
                    templateUrl: function($routeParams) {
                        return "/templates/" + $routeParams.directory + "/_" + $routeParams.page + ".html";
                    }
                })
                .otherwise({
                    templateUrl: "/templates/_error.html"
                });

            $mdThemingProvider.theme("default")
                .primaryPalette("blue")
                .accentPalette("light-blue");
        }])
        //override default exception handler to send errors server-side
        .factory("$exceptionHandler", ["dtLogService", function(logService) {

            return function(exception, cause) {

                var exceptionToRaise = _.isObject(exception) ? exception.message : exception,
                    logInfo;

                if (exceptionToRaise) {
                    logInfo = {
                        level: "error",
                        message: exception && exception.message ? exception.message : exception,
                        cause: cause,
                        exception: exceptionToRaise,
                        stack: exception && exception.stack ? exception.stack : exception
                    };

                    //log to server, console
                    logService.save(logInfo);
                    console.error(logInfo);
                }
            };
        }]);

}(angular));
