var gulp = require('gulp');

gulp.task('default', ['jasmine', 'build', 'concat-css','copy','watch', 'serve', 'open']);
