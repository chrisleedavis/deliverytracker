(function() {
    "use strict";

    var gulp = require("gulp"),
        liveServer = require("gulp-live-server"),
        watch = require("gulp-watch");

    gulp.task("start-server", function() {

        var serverPath = "./dist/server.js",
            server = liveServer.new(serverPath);

        server.start();

        //restart server when changes are detected
        gulp.watch(["./dist/public/**/*.{html,css,png,js}", "./src/app/**/*.js"], function (file) {
            server.notify.apply(server, [file]);
        });
        gulp.watch(serverPath, server.start.bind(server));

        //add watches for application
        gulp.watch("./src/public/**/*.{html,css,png}", ["replace"]);
        gulp.watch(["./src/**/*.html", "!./src/public/**/*.html"], ["ngTemplates"]);
    });

}());
