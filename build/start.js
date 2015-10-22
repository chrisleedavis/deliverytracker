var gulp = require("gulp"),
    runSequence = require("run-sequence").use(gulp);

gulp.task("start", function(cb) {
    runSequence(
        "clean",
        ["copy-static-content", "copy-server"],
        "ngTemplates",
        ["replace", "bundle-app", "bundle-lib", "bundle-app-css", "bundle-lib-css"],
        "start-server",
        "test",
        cb);
});