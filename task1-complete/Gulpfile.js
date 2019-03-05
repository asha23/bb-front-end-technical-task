"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
const useref = require("gulp-useref");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require('gulp-autoprefixer');

/*----------  Config settings  ----------*/

const config = {
  devPath: "./src/",
  publicPath: "./public/",
  sassDir: "scss/",
  jsDir: "js/",
  cssDir: "css/",
  fontDir: "fonts/",
  moduleDir: "./node_modules"
};

/*----------  Define tasks  ----------*/

gulp.task("browserSync", () => {
  const htmlDir = config.publicPath;
  const srcDir = config.devPath;

  browserSync.init({
    server: {
        baseDir: htmlDir,
        routes: {
            "css": "./css"
       }
    }
  });

  gulp.watch(srcDir + "/*.html").on('change', browserSync.reload);
});

gulp.task("sassTask", () => {
  const sassFiles = config.devPath + config.sassDir + "/*.scss";
  const destDir = config.publicPath + config.cssDir;

  return gulp
    .src(sassFiles)
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on(
        "error",
        notify.onError(function(error) {
          return "Error: " + error.message;
        })
      )
    )
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(destDir));
});

gulp.task("minify", () => {
  const destDir = config.publicPath;

  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(destDir));
});

gulp.task("useref", () => {
  const htmlFiles = config.devPath + "*.html";
  const destDir = config.publicPath;

  return (
    gulp
      .src(htmlFiles)
      .pipe(useref())
      // Minifies only if it's a JavaScript file
      .pipe(gulpIf("*.js", uglify()))
      // Minifies only if it's a CSS file
      .pipe(gulpIf("*.css", cssnano()))
      .pipe(gulp.dest(destDir))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

gulp.task("js", () => {
  const jsFiles = config.devPath + config.jsDir + "**/*.js"; // All files
  const destDir = config.publicPath + config.jsDir;

  return gulp.src(jsFiles).pipe(gulp.dest(destDir));
});

gulp.task("fonts", () => {
  const fontFiles = config.devPath + config.fontDir + "**/*"; // All files
  const destDir = config.publicPath + config.fontDir;

  return gulp.src(fontFiles).pipe(gulp.dest(destDir));
});

/*----------  Define watch  ----------*/

gulp.task(
  "watch",
  ["sassTask", "js", "useref", "fonts", "minify", "browserSync"],
  () => {
    const sassFiles = config.devPath + config.sassDir + "**/*.scss";
    const jsFiles = config.devPath + config.jsDir + "**/*.js";
    const htmlFiles = config.devPath + "*.html";
    const fontFiles = config.devPath + config.fontDir + "**/*";

    gulp.watch(sassFiles, ["sassTask", "useref"]);
    gulp.watch(jsFiles, ["js", "useref"]);
    gulp.watch(htmlFiles, ["useref"]);
    gulp.watch(fontFiles, ["fonts"]);
  }
);

gulp.task("default", ["browserSync", "sassTask", "useref", "fonts", "minify"]);
