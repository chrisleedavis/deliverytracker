var gulp = require("gulp"),
    globals = require("./_globals.js"),
    path = require("path"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    Karma = require("karma").Server,
    coveralls = require("gulp-coveralls"),
    runTest = function(isProduction) {

        var config = {
            configFile: process.cwd() + "/karma.conf.js",
            singleRun: isProduction
        };

        if (!isProduction) {
            config.coverageReporter = {
                type: "text" //change from text to text-summary for details or summary
            };
        }

        return gulp.src(["!./src/server/server.js", "./src/app/**/*.js"])
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter("fail"))
            .on("end", function() {
                new Karma(config).start();
            });
    };

gulp.task("test", function(){
    return runTest(globals.isProduction);
});

gulp.task("coveralls", ["test"], function() {
    return gulp.src("./coverage/**/lcov.info")
        .pipe(coveralls());
});

