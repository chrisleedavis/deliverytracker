var gulp = require("gulp"),
    globals = require("./_globals"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish");

gulp.task("copy-static-content", function() {
    return gulp.src("./src/public/**/*.{html,css,png}")
        .pipe(gulp.dest("./dist/public"));
});

gulp.task("copy-server", function(){
    return gulp.src("./src/server/server.js")
        .pipe(jshint(globals.getJSHintConfig()))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter("fail"))
        .pipe(gulp.dest("./dist"));
});
