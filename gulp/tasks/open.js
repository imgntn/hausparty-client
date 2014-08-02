var gulp = require('gulp');
var open = require("gulp-open");
var config = require('../config');
var plumber=require('gulp-plumber')
gulp.task('open', ['build'], function() {

	var options = {
		url: "http://localhost:" + config.port,
		app: "google chrome"
	};

	return gulp.src("./index.html").pipe(plumber()).pipe(open("", options));
});
