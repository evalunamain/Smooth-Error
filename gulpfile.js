var gulp = require("gulp");
var babel = require("gulp-babel");
var $ = require('gulp-load-plugins')();
var sass = require('gulp-sass');

gulp.task("js", function () {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./dist"));
});

gulp.task('css', function() {
   gulp.src(['./src/scss/**/*.scss'])
   .pipe(sass({style: 'expanded'}))
   .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
   gulp.watch(['./src/**/*.js'], ['js']);
   gulp.watch(['./src/**/*.scss'], ['css']);
});

gulp.task('default', ['js', 'css', 'watch'], function() {});