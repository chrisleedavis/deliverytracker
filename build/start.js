var gulp = require("gulp"),
    runSequence = require("run-sequence").use(gulp);

gulp.task("start", (cb) => {
    runSequence(
        "clean",
        ["copy-static-content"],
        "ngTemplates",
        ["replace", "bundle-app", "bundle-lib", "bundle-app-css", "bundle-lib-css"],
        "start-server",
        "start-mongo-database",
        cb);
});