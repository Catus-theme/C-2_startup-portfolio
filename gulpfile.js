var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var del = require('del');

// Set the banner content
// var banner = ['/*!\n',
//   ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
//   ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
//   ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
//   ' */\n',
//   ''
// ].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp.src('public/scss/stylish-portfolio.scss')
    .pipe(sass())
    // .pipe(header(banner, {
    //   pkg: pkg
    // }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('public/css/stylish-portfolio.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('public/js/stylish-portfolio.js')
    .pipe(uglify())
    // .pipe(header(banner, {
    //   pkg: pkg
    // }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('public/vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('public/vendor/jquery'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('public/vendor/jquery-easing'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('public/vendor/font-awesome'))

  gulp.src(['node_modules/simple-line-icons/*/*'])
    .pipe(gulp.dest('public/vendor/simple-line-icons'))
})
gulp.task('clean' , function() {
  return del.sync('public/css/*.css');
})
// Default task
gulp.task('default', ['clean','sass', 'minify-css', 'minify-js', 'copy' , 'dev']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], function() {
  gulp.watch('public/scss/*.scss', ['sass']);
  gulp.watch('public/css/*.css', ['minify-css']);
  gulp.watch('public/js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('views/*.pug', browserSync.reload);
  gulp.watch('public/js/**/*.js', browserSync.reload);
});
