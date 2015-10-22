//module used to stay DRY for sharing variables/values between tasks
var argv = require("yargs").argv;

module.exports = {
    isProduction: argv.prod || argv.production || argv.p,
    getAppSources: function() {
        return [
            "./src/app/app.js",
            "!./src/server/server.js",
            "!./src/**/*.spec.js",
            "./src/app/**/*.js"
        ];
    },
    getLibSources: function() {
        return [
            "./node_modules/angular/angular.js",
            "./node_modules/angular-route/angular-route.js",
            "./node_modules/angular-animate/angular-animate.js",
            "./node_modules/angular-aria/angular-aria.js",
            "./node_modules/angular-material/angular-material.js",
            "./node_modules/lodash/index.js"
        ];
    },
    getLibCssSources: function() {
        return [
            "./node_modules/angular-material/angular-material.css"
        ];
    },
    getJSHintConfig: function() {
        return {
            node: true,
            undef: true,
            eqeqeq: true,
            globals: {
                angular: true,
                _: true,
                beforeEach: true,
                describe: true,
                inject: true,
                it: true,
                expect: true
            }
        };
    }
};
