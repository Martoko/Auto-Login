gulp = require('gulp')
plumber = require('gulp-plumber')
coffee = require('gulp-coffee')
watch = require('gulp-watch')
include = require('gulp-include')
appendPrepend = require('gulp-append-prepend')
uglify = require('gulp-uglify')
pump = require('pump')
rename = require("gulp-rename")


gulp.task 'default', [
  'coffee'
]

gulp.task 'coffee', (cb) ->
  pump([
    gulp.src('src/auto_login.coffee')
    plumber()
    include()
    coffee({ bare: true })
    # uglify()
    appendPrepend.prependFile('src/metadata.js')
    rename((path) ->
      path.basename += '.user'
    )
    gulp.dest('out')
  ], cb)
  return

gulp.task 'watch', ->
  gulp.start 'coffee'

  gulp.watch([ 'src/*' ], ['coffee'])
