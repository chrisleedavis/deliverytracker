var gulp = require("gulp"),
    globals = require("./_globals.js"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    cssmin = require("gulp-cssmin"),
    sourceMaps = require("gulp-sourcemaps"),
    bundleFn = function(sources, resultFile, fn) {
        return gulp.src(sources)
            .pipe(sourceMaps.init())
            .pipe(concat(resultFile))
            .pipe(fn())
            .pipe(sourceMaps.write())
            .pipe(gulp.dest("./dist/public"));
    };

gulp.task("bundle-app", function(){
    if (globals.isProduction) {
        return bundleFn(
            globals.getAppSources(),
            "app.min.js",
            uglify);
    }
});

gulp.task("bundle-lib", function() {
    if (globals.isProduction) {
        return bundleFn(
            globals.getLibSources(),
            "lib.min.js",
            uglify);
    }
});

gulp.task("bundle-app-css", function() {
    if (globals.isProduction) {
        return bundleFn(
            ["./dist/public/app.css"],
            "app.min.css",
            cssmin);
    }
});

gulp.task("bundle-lib-css", function() {
    if (globals.isProduction) {
        return bundleFn(
            globals.getLibCssSources(),
            "lib.min.css",
            cssmin);
    }
});