(function() {
    "use strict";

    var gulp = require("gulp"),
        globals = require("./_globals.js"),
        concat = require("gulp-concat"),
        uglify = require("gulp-uglify"),
        cssmin = require("gulp-cssmin"),
        sourceMaps = require("gulp-sourcemaps"),
        argv = require("yargs").argv,
        isProduction = argv.prod || argv.production || argv.p,
        bundleFn = function(sources, resultFile, fn) {
            return gulp.src(sources)
                .pipe(sourceMaps.init())
                .pipe(concat(resultFile))
                .pipe(fn())
                .pipe(sourceMaps.write())
                .pipe(gulp.dest("./dist/public"));
        };

    gulp.task("bundle-app", function(){
        if (isProduction) {
            return bundleFn(
                globals.getAppSources(),
                "app.min.js",
                uglify);
        }
    });

    gulp.task("bundle-lib", function() {
        if (isProduction) {
            return bundleFn(
                globals.getLibSources(),
                "lib.min.js",
                uglify);
        }
    });

    gulp.task("bundle-app-css", function() {
        if (isProduction) {
            return bundleFn(
                ["./dist/public/app.css"],
                "app.min.css",
                cssmin);
        }
    });

    gulp.task("bundle-lib-css", function() {
        if (isProduction) {
            return bundleFn(
                globals.getLibCssSources(),
                "lib.min.css",
                cssmin);
        }
    });

}());
