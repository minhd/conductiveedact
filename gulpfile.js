'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let server = require('gulp-server-livereload');
let cleanCSS = require('gulp-clean-css');
let concat = require('gulp-concat');
let concatCss = require('gulp-concat-css');
let minify = require('gulp-minify');

let config = {
  dir : {
    lib : './node_modules',
    src: './src',
    dist: './dist'
  }
}

gulp.task('static-files', () => {
  gulp.src(config.dir.src + '/images/*.*')
    .pipe(gulp.dest(config.dir.dist + '/images'));
  return gulp.src(config.dir.src + '/*.html')
    .pipe(gulp.dest(config.dir.dist));
});

gulp.task('sass', function () {
  return gulp.src(config.dir.src + '/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.dir.dist + '/assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(config.dir.src + '/assets/sass/**/*.scss', ['sass', 'concat-styles']);
});

gulp.task('concat-styles', ['sass', 'static-files'], () => {
  return gulp.src([
    config.dir.src + '/assets/css/font-awesome.min.css',
    config.dir.dist + '/assets/css/main.css'
  ]).pipe(concatCss('bundle.css'))
    .pipe(gulp.dest(config.dir.dist + '/assets/css'));
});

gulp.task('fonts', function() {
  return gulp.src(config.dir.lib + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest(config.dir.dist +'/assets/fonts'));
});

gulp.task('minify-css', ['concat-styles'], () => {
  return gulp.src(config.dir.dist + '/assets/css/bundle.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.dir.dist + '/assets/css'));
});

gulp.task('js-lib', () => {
  return gulp.src([
    config.dir.lib + '/jquery/dist/jquery.min.js',
    config.dir.src + '/assets/js/skel.min.js'
  ]).pipe(concat('lib.js'))
    .pipe(gulp.dest(config.dir.dist + '/assets/js'));
});

gulp.task('js-ie', () => {
  return gulp.src(config.dir.src + '/assets/js/ie/*.js')
    .pipe(gulp.dest(config.dir.dist + '/assets/js/ie'));
});

gulp.task('js-main', () => {
  return gulp.src(config.dir.src + '/assets/js/main.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest(config.dir.dist + '/assets/js'));
});

gulp.task('js:watch', () => {
  gulp.watch(config.dir.src + '/assets/js/**/*.js', ['js']);
});

gulp.task('js', ['js-lib', 'js-ie', 'js-main']);

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      host: 'localhost',
      port: 8001,
      open: true,
      livereload: true,
      //directoryListing: false,
    }));
});

gulp.task('watch', ['sass:watch', 'js:watch']);
gulp.task('build', ['fonts', 'sass', 'js', 'static-files', 'concat-styles', 'minify-css']);
gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('serve', ['build', 'webserver']);