(function(angular) {
    "use strict";

    angular.module("dtApp",
        ["ngSanitize", "dtTemplates", "ngMaterial", "ngRoute", "ngMessages", "ngFileUpload", "dtServices", "dtModels", "dtDirectives"])
        .config(["$routeProvider", "$mdThemingProvider", "$locationProvider", function($routeProvider, $mdThemingProvider, $locationProvider) {

            var routeResolver = {
                    resolveRoute: ["$q", "$route", "$window", "$location", function($q, $route, $window, $location) {
                        var defer = $q.defer();
                        
                        if ($route.current.params.page === "login" || $route.current.params.page === "signUp" || $window.sessionStorage.token) {
                            defer.resolve(true);
                        } else {
                            defer.reject(false);
                            $location.path("/di/login");
                        }

                        return defer.promise;
                    }]
                };

            $locationProvider.html5Mode(true);

            $routeProvider
                .when("/", {
                    templateUrl: "/templates/home/_home.html"
                })
                .when("/di/:page", {
                    templateUrl: function($routeParams) {
                        return "/templates/" + $routeParams.page + "/_" + $routeParams.page + ".html";
                    },
                    resolve: routeResolver
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
