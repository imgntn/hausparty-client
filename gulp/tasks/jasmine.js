var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('jasmine', function () {
    gulp.src('src/spec/*.js')
        .pipe(jasmine({verbose:true, includeStackTrace: true}));
});