var gulp       = require('gulp');
var livereload = require('gulp-livereload');


gulp.task('watch', function() {
	
	gulp.watch('src/templates/*.hbs', ['browserify']);
	gulp.watch('src/views/*.js', ['browserify']);
	gulp.watch('src/models/*.js', ['browserify']);
	gulp.watch('src/*.js', ['browserify']);
	gulp.watch('src/styles/*.css', ['concat-css']);

	var server = livereload();

	var reload = function(file) {
		server.changed(file.path);
	};

		gulp.watch(['build/**']).on('change', reload);
	
});
