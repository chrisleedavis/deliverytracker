(function(angular) {
    "use strict";

    angular.module("dtApp",
        ["dtTemplates", "ngMaterial", "ngRoute", "ngMessages", "ngFileUpload", "dtServices", "dtModels"])
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
        }]);

}(angular));
