const gulp = require('gulp');
// const { promisify } = require('util');
const exec = require('child_process').exec
// const execAsync = promisify(exec)

gulp.task('md-links', function (callback) {
  exec('node index.js')
  callback()
})
