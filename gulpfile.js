var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var less = require('gulp-less');
var shell = require("gulp-shell");
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var plato = require('gulp-plato');

// Build our styles from the master.less file
gulp.task('less', function() {
    return gulp.src('./less/master.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('./css'));
});

// Custom Bootstrap javascript build
gulp.task('bs-js', function() {
    return gulp.src([
        './bower_components/bootstrap-less/js/collapse.js',
        './bower_components/bootstrap-less/js/dropdown.js',
        './bower_components/bootstrap-less/js/modal.js'
    ])
        .pipe(concat('bootstrap.js'))
        .pipe(gulp.dest('./js/lib'));
});

// Lint everything but the lib and test directories
gulp.task('lint', function() {
    return gulp.src(['./js/**/*.js', '!./js/lib/**', '!./js/test/**'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Minifies our styles
gulp.task('min-css', function() {
    return gulp.src('./css/styles.css')
        .pipe(minifyCSS({
            relativeTo: './',
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./b/'))
});

// runs r.js optimizer
gulp.task('optimize', function() {
    return gulp.src('./build.js')
        .pipe(shell('r.js -o <%= file.path %>'));
});

// runs mocha tests
gulp.task('mocha', function() {
    return gulp.src('./SpecRunner.html')
        .pipe(mochaPhantomJS({
            reporter: 'spec'
        }));
});

gulp.task('plato', function() {
    return gulp.src(['./js/**/*.js', '!./js/lib/**', '!./js/test/**'])
        .pipe(plato('report', {
            jshint: {
                options: {
                    strict: true
                }
            },
            complexity: {
                trycatch: true
            }
        }));
});

/* Default Task */
gulp.task('default', ['lint']);

gulp.task('bootstrap', ['less', 'bs-js']);

gulp.task('fullbuild', ['lint', 'bootstrap', 'min-css', 'optimize', 'mocha', 'plato']);