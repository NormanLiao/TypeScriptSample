const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('html-move', () => {
  return gulp.src('./source/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('js-move', () => {
    return gulp.src('./source/scripts/*')
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task('dev', gulp.parallel('js-move', 'html-move', function () {
    browserSync.init({
        server: {
          baseDir: './public',
        },
        port: 6600,
        reloadDelay: 100,
      });
    gulp.watch('./source/*.html', gulp.series('html-move', reload));
    gulp.watch('./source/**/*.js', gulp.series('js-move', reload));
}));