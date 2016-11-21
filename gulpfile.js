'use strict';

var gulp = require('gulp')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , imagemin = require('gulp-imagemin')
  ;


var SRC = {
  scss: './static/scss',
  img:  './static/img'
};

var DEST = {
  css: './app/static/css',
  img: './app/static'
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

// Copy/minify image assets
gulp.task('copy-images', function() {
  gulp.src(SRC.img + '**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest(DEST.img));
});

gulp.task('copy-images:watch', function() {
  gulp.watch(SRC.img + '**/*.+(png|jpg|jpeg|gif|svg)');
});


gulp.task('default', ['sass', 'sass:watch', 'copy-images', 'copy-images:watch']);
gulp.task('deploy', ['sass, copy-images']);