'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

var SRC = {
  scss: './static/scss'
};

var DEST = {
  css: './app/static/css'
};

// Compile Sass into CSS
gulp.task('sass', function() {
  gulp.src(`${SRC.scss}/*.scss`)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(DEST.css));
});
gulp.task('sass:watch', function() {
  gulp.watch(`${SRC.scss}/**/*.scss`, ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);
