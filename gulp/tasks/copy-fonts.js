var gulp=require('gulp');

gulp.task('copy-fonts', function() {
   gulp.src('./src/styles/fonts/*.{ttf,woff,eof,svg}')
   .pipe(gulp.dest('build/styles/fonts'));
});