/*
 This task is used for making sure the correct static references are injected into the server page (index.html)
 based on the start/build mode:

 1. Development mode will use actual source files
 2. Production mode will use bundled/minified files along with source maps
 */
var gulp = require("gulp"),
    globals = require("./_globals.js"),
    tap = require("gulp-tap"),
    replace = require("gulp-html-replace"),
    replaceFn = (options) => {
        return gulp.src(["./dist/index.html"])
            .pipe(replace(options))
            .pipe(gulp.dest("./dist"));
    },
    productionReplace = () => {
        var options = {
            lib: {
                src: null,
                tpl: '<script src="lib.min.js"></script>'
            },
            app: {
                src: null,
                tpl: '<script src="app.min.js"></script>'
            },
            libcss: {
                src: null,
                tpl: '<link href="lib.min.css" rel="stylesheet">'
            },
            appcss: {
                src: null,
                tpl: '<link href="app.min.css" rel="stylesheet">'
            }
        };

        return replaceFn(options);
    },
    developmentReplace = () => {
        var sources = ["./src/app/app.js"],
            options = {
                lib: {
                    src: globals.getLibSources(),
                    tpl: '<script src="%s"></script>'
                },
                app: {
                    src: sources,
                    tpl: '<script src="%s"></script>'
                },
                libcss: {
                    src: globals.getLibCssSources(),
                    tpl: '<link href="%s" rel="stylesheet">'
                },
                appcss: {
                    src: ["app.css"],
                    tpl: '<link href="%s" rel="stylesheet">'
                }
            },
            tapPromise = new Promise((resolve, reject) => {
                gulp.src([
                    "!./src/app/app.js",
                    "!./src/server/server.js",
                    "!./src/**/*.spec.js",
                    "./src/app/**/*.js"
                ])
                    .pipe(tap((file) => {
                        var path = file.path.replace(file.base, "./src/app/").replace("\\", "/");
                        sources.push(path);
                    }))
                    .on("end", resolve)
                    .on("error", reject);
            });

        return tapPromise.then(() => {
            replaceFn(options);
        });
    };

gulp.task("replace", ["copy-static-content"], () => {

    return globals.isProduction ? productionReplace() : developmentReplace();
});
