var gulp        = require('gulp');
var browserSync = require('browser-sync');
var ts          = require('gulp-typescript');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var typedoc     = require('gulp-typedoc');
var sourcemaps  = require('gulp-sourcemaps');
var reload      = browserSync.reload;
var build       = require('./build.settings');
var argv        = require('yargs').argv;
var gulpif      = require('gulp-if');
var webpack     = require('webpack-stream');

gulp.task('moveStaticFile', function() {
    return gulp.src([
        './static/**'])
        .pipe(gulp.dest( build.output ));
});

gulp.task('build', ['ts-build', 'html-move'], function() {
    gulp.src(build.externalLibs)
        .pipe(sourcemaps.init())
        .pipe(concat('3rdscript.js'))
        .pipe(gulpif(argv.uglify, uglify()))
        .pipe(rename(function(path) {
            path.basename += '';
            path.extname = '.js';
        }))
        .pipe(sourcemaps.write(build.sourceMapsPath))
        .pipe(gulp.dest(build.output));
});

gulp.task('ts-build', function() {
    gulp.src(build.entry)
        .pipe(webpack({
            output: {
                filename: 'render_api.js'
            },
            devtool: 'source-map',
            resolve: {
                extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
            },
            module: {
                loaders: [
                    { test: /\.ts$/, loader: 'ts-loader' }
                ]
            }
        }))
        .pipe(gulp.dest(build.output));
});

gulp.task('html-move', function() {
    gulp.src('app/index.html')
        .pipe(gulp.dest(build.output));

});

// Watch files for changes & reload
gulp.task('serve', ['moveStaticFile', 'build'], function () {
    browserSync({
        port: 8000,
        notify: false,
        logPrefix: 'typescript_example',
        server: build.output
    });
});


gulp.task('watch', function () {
    gulp.watch(['app/**/*.html'], ['html-move',reload]);
    gulp.watch(['app/**/*.ts'], ['ts-build', reload]);
    gulp.watch(['app/scripts/**/*.js'], reload);
});


gulp.task('build-doc', function() {
    gulp.src(['app/ts/CameraView.ts'])
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: 'commonjs',
            target: 'es5',
            includeDeclarations: false,
            excludeExternals: false,

            // Output options (see typedoc docs)
            out: `${build.output}doc`,

            // TypeDoc options (see typedoc docs)
            name: 'TypeScript Project',
            ignoreCompilerErrors: false,
            version: true,
        }));
});

gulp.task('dev', ['serve', 'watch']);
gulp.task('default', ['serve', 'watch']);
