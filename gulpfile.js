
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require("merge2");
var sourcemaps = require('gulp-sourcemaps');
var mocha = require('gulp-mocha');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('.dist')),
        tsResult.js.pipe(sourcemaps.write('./')).pipe(gulp.dest('.dist'))
    ]);
});


/**
 * Run tests
 */
gulp.task('test', function () {
    return gulp.src(['.dist/test/*.js'], { read: false })
        .pipe(mocha());
});

/**
 * Watch files and run tests
 */

gulp.task('watch', function () {
    gulp.watch(['src/**', 'test/**'], ['build','test']);
});