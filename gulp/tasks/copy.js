var gulp = require('gulp');
var plumber = require('gulp-plumber');
gulp.task('copy', ['browserify', 'imagemin','copy-fonts'], function() {
	gulp.src('./index.html').pipe(plumber())
		.pipe(gulp.dest('static-fileserver'));

		gulp.src('./build/styles/fonts/*.*').pipe(plumber())
		.pipe(gulp.dest('static-fileserver/build/styles/fonts'));

		gulp.src('./build/styles/images/*.*').pipe(plumber())
		.pipe(gulp.dest('static-fileserver/build/styles/images'));

	gulp.src('./build/bundle.css').pipe(plumber())
		.pipe(gulp.dest('static-fileserver/build'));

	gulp.src('./build/bundle.js').pipe(plumber())
		.pipe(gulp.dest('static-fileserver/build'));
})


