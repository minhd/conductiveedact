'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let server = require('gulp-server-livereload');
let cleanCSS = require('gulp-clean-css');

let config = {
  libdir: './node_modules'
}

gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

gulp.task('fonts', function() {
  return gulp.src(config.libdir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest('./assets/fonts'));
});

gulp.task('minify-css', () => {
  return gulp.src('./assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('styles', ['fonts', 'sass', 'minify-css']);

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(server({
      host: 'localhost',
      port: 8001,
      open: true,
      livereload: true,
      directoryListing: false,
    }));
});

gulp.task('watch', ['sass:watch']);
gulp.task('build', ['styles']);
gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('serve', ['build', 'webserver']);