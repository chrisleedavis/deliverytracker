var gulp = require("gulp"),
    runSequence = require("run-sequence").use(gulp);

gulp.task("build", (cb) => {
    runSequence(
        "clean",
        ["copy-static-content"],
        "ngTemplates",
        ["replace", "bundle-app", "bundle-lib", "bundle-app-css", "bundle-lib-css"],
        ["test", "test-server"],
        cb);
});