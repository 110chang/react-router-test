//gulpfile.js

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var browsersync = require('browser-sync');

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.sass')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./dest'))
    .pipe(browsersync.stream());
});

gulp.task('concat', function() {
  browserify({
    entries: ['./src/js/main.js'],
    debug: !gulp.env.production
  }).transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dest'))
    .pipe(browsersync.stream());
});

gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: ['./dest/']
    },
    open: false
  });
});

gulp.task('default', ['server', 'concat'], function() {
  gulp.watch('./src/js/**/*', ['concat']);
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./dest/**/*', function() {
    browsersync.reload();
  });
});

