var gulp = require("gulp"),
    globals = require("./_globals.js"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    sass = require('gulp-sass'),
    cssmin = require("gulp-cssmin"),
    sourceMaps = require("gulp-sourcemaps"),
    bundleFn = (sources, resultFile, fn) => {
        return gulp.src(sources)
            .pipe(sourceMaps.init())
            .pipe(concat(resultFile))
            .pipe(fn())
            .pipe(sourceMaps.write())
            .pipe(gulp.dest("./dist"));
    };

gulp.task("bundle-app", () => {
    if (globals.isProduction) {
        return bundleFn(
            globals.getAppSources(),
            "app.min.js",
            uglify);
    }
});

gulp.task("bundle-lib", () => {
    if (globals.isProduction) {
        return bundleFn(
            globals.getLibSources(),
            "lib.min.js",
            uglify);
    }
});

gulp.task("bundle-app-css", () => {

    var themeDir = "./theme/" + globals.theme;

    gulp.src([themeDir, "./src/public/sass/**/*.scss"])
        .pipe(sass({includePaths: themeDir}))
        .pipe(concat("app.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest("./dist"));
});

gulp.task("bundle-lib-css", () => {
    if (globals.isProduction) {
        return bundleFn(
            globals.getLibCssSources(),
            "lib.min.css",
            cssmin);
    }
});