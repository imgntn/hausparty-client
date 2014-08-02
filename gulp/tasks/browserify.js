var browserify = require('browserify');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var hbsfy = require('hbsfy');

var uglify = require('gulp-uglify')

//the core bundle for our application 
gulp.task('browserify', function() {
   return browserify('./src/index.js', {
         debug: true,
         insertGlobals: true,
         transform: ['hbsfy']
      })
      .bundle()
      .on('error', handleErrors)

   .pipe(source('bundle.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest('build'));
});