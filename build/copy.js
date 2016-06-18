var gulp = require("gulp"),
    globals = require("./_globals.js"),
    themeDir = "./theme/" + globals.theme + "/**/*.{png,ico}";

gulp.task("copy-static-content", () => {
    return gulp.src(["./src/public/**/*.{html,css,png,ico}", themeDir])
        .pipe(gulp.dest("./dist"));
});
