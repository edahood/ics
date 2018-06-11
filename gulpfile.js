var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var paths = {
  src: 'src/**/*.js',
  dest: 'dist',
  test: 'test/**/*.js'
};
var clean = require('gulp-clean');

gulp.task('clean-scripts', function () {
    return gulp.src(paths.dest, {read: false})
        .pipe(clean());
});
gulp.task('watch', function() {
  return gulp.watch(paths.src, ['build']);
});

gulp.task('build', ['clean-scripts'], function () {
  return gulp.src(paths.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.dest));
});

gulp.task('dev', ['watch', 'build']);
