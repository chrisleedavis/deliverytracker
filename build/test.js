(function() {
    "use strict";

    var gulp = require("gulp"),
        globals = require("./_globals.js"),
        path = require("path"),
        jshint = require("gulp-jshint"),
        stylish = require("jshint-stylish"),
        Karma = require("karma").Server,
        runTest = function(isSingleRun) {

            var config = {
                configFile: process.cwd() + "/karma.conf.js",
                singleRun: isSingleRun
            };

            return gulp.src(["!./src/server/server.js", "./src/app/**/*.js"])
                .pipe(jshint(globals.getJSHintConfig()))
                .pipe(jshint.reporter(stylish))
                .pipe(jshint.reporter("fail"))
                .on("end", function() {
                    new Karma(config).start();
                });
        };

    gulp.task("test-watch", function(){
        return runTest(false);
    });

    gulp.task("test-run-once", function() {
        return runTest(true);
    });

}());
