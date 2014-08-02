var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var plumber=require('gulp-plumber')
gulp.task('concat-css', function () {
  gulp.src('src/**/*.css')
    .pipe(plumber())
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('build/'));
});