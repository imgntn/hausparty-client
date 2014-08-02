var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
 var cache = require('gulp-cache');
// gulp.task('imagemin', function () {
//     return gulp.src('src/styles/images/*')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngcrush()]
//         }))
//         .pipe(gulp.dest('build/styles/images'));
// });


gulp.task('imagemin', function () {
    return gulp.src('src/styles/images/*')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        })))
        .pipe(gulp.dest('build/styles/images'));
});