var gulp = require("gulp"),
    globals = require("./_globals.js"),
    path = require("path"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    Karma = require("karma").Server,
    coveralls = require("gulp-coveralls"),
    jasmine = require("gulp-jasmine"),
    istanbul = require("gulp-istanbul"),
    concat = require("gulp-concat"),
    runTest = (isProduction) => {

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
            .on("end", () => {
                new Karma(config).start();
            });
    };

gulp.task("test-client", () => {
    return runTest(globals.isProduction);
});

gulp.task("pre-test-server", function () {
    return gulp.src(["./src/server/**/*.js",
            "!./src/server/config/config.js", "!./src/server/**/*.spec.js"])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter("fail"))
        .pipe(istanbul({ includeUntested: true }))
        .pipe(istanbul.hookRequire());
});

gulp.task("test-server", ["pre-test-server"], () => {

    var reporters = ["lcovonly"];

    if (!globals.isProduction) {
        reporters.push("text");
    }

   return gulp.src("./src/server/**/*.spec.js")
        .pipe(jasmine({
            includeStackTrace: true
           }))
        .on("error", () => {
           process.exit(1);
        })
        .pipe(istanbul.writeReports({
            reporters: reporters,
            reportOpts: {
                dir: "./coverage/server"
            }
        }));
});

gulp.task("test-server-coverage", ["pre-test-server", "test-server"], () => {
    var reporters = ["lcovonly"];

    if (!globals.isProduction) {
        reporters.push("text");
    }

    return gulp.src("./src/server/**/*.spec.js")
        .pipe(istanbul.writeReports({
            reporters: reporters,
            reportOpts: {
                dir: "./coverage/server"
            }
        }));
});

gulp.task("test", ["test-client", "test-server"]);

gulp.task("pre-coveralls", () => {
    return gulp.src("./coverage/**/lcov.info")
        .pipe(concat("lcov.info"))
        .pipe(gulp.dest("./coverage"));
});

gulp.task("coveralls", ["pre-coveralls"], () => {
    return gulp.src("./coverage/lcov.info")
        .pipe(coveralls());
});
