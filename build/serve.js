var gulp = require("gulp"),
    globals = require("./_globals.js"),
    productionFn = () => {
        var exec = require("child_process").exec,
            shell = exec("node ./src/server/server.js --prod");

        shell.stdout.on("data", (data) => {
            console.log(data);
        });
    },
    developmentFn = () => {
        var watch = require("gulp-watch"),
            liveServer = require("gulp-live-server"),
            serverPath = "./src/server/server.js",
            server = liveServer([serverPath]);

        server.start();

        //restart server when changes are detected
        gulp.watch(["./dist/**/*.{html,css,png,js}", "./src/app/**/*.js"], (file) => {
            server.notify.apply(server, [file]);
        });
        gulp.watch(serverPath, server.start.bind(server));

        //add watches for application
        gulp.watch("./src/public/**/*.{html,css,png}", ["replace"]);
        gulp.watch(["./src/**/*.html", "!./src/public/**/*.html"], ["ngTemplates"]);
    };

gulp.task("start-server", () => {

    return globals.isProduction ? productionFn() : developmentFn();
});

gulp.task("start-mongo-database", () => {
    var config = require("../src/server/config/config"),
        exec = require("child_process").exec,
        shell;

    if (config.databaseProvider === "mongo") {
        shell = exec(config.databaseStartCommand);

        shell.stdout.on("data", (data) => {
            console.log(data);
        });
    }

});