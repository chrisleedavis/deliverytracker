var gulp = require("gulp");

gulp.task("copy-static-content", () => {
    return gulp.src("./src/public/**/*.{html,css,png}")
        .pipe(gulp.dest("./dist"));
});
