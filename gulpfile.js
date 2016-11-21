'use strict';

var gulp = require('gulp')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  ;

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
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(DEST.css));
});
gulp.task('sass:watch', function() {
  gulp.watch(`${SRC.scss}/**/*.scss`, ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);