(function() {
    "use strict";

    var gulp = require("gulp"),
        htmlmin = require("gulp-htmlmin"),
        ngTemplates = require("gulp-ng-templates");

    gulp.task("ngTemplates", function () {
        return gulp.src(["./src/app/**/*.html", "!./src/public/**/*.html"])
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(ngTemplates({
                filename: "templates.js",
                module: "dtTemplates",
                standalone: true,
                path: function (path, base) {
                    return path.replace(base, "/templates/");
                }
            }))
            .pipe(gulp.dest("./src/app/_generatedTemplates"));
    });

}());
