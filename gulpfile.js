var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', function() {
    var tsResult = gulp.src("src/**/*.ts") // or tsProject.src() 
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('.dist'));
});