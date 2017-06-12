var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var include = require('gulp-include');
var appendPrepend = require('gulp-append-prepend');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

gulp.task('default', ['babel']);

gulp.task('babel', function(cb) {
  pump([
    gulp.src('src/main.js'),
    plumber(),
    include(),
    babel(),
    appendPrepend.prependFile('src/metadata.js'),
    rename(function(path) {
      return path.basename += '.user';
    }),
    gulp.dest('out')
  ], cb);
});

gulp.task('watch', function() {
  gulp.start('babel');
  return gulp.watch(['src/*'], ['babel']);
});
