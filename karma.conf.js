var globals = require("./build/_globals.js"),
    _ = require("lodash"),
    files = [],
    libFiles = globals.getLibSources(),
    appFiles = globals.getAppSources();

libFiles.push("./node_modules/angular-mocks/angular-mocks.js");
appFiles = _.without(appFiles, "!./src/server/server.js", "!./src/**/*.spec.js");
files = _.union(libFiles, appFiles);

module.exports = function (config) {
    config.set({
        frameworks: ["jasmine"],
        reporters: ["dots", "coverage"],
        browsers: ["PhantomJS"],
        files: files,
        exclude: ["./src/server.js"],
        preprocessors: {
            "./src/**/!(*.spec).js": ["coverage"]
        },
        coverageReporter: {
            type: "lcovonly" //change from text to text-summary for details or summary
        }
    });

    config.LOG_DEBUG = true;
};
