// Include gulp
var gulp = require('gulp');

// node file system
var fs = require('fs');

// Include Our Plugins
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var swig = require('gulp-swig');

// Compile Our Sass
gulp.task('sass', function() {

    var stream = gulp.src('src/scss/base.scss')
        .pipe(gulp.dest('./dist/scss'))
        .pipe(sass({ includePaths : ['src/scss'] }))
        .pipe(rename('base.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./'))
        .pipe(minify())
        .pipe(rename('base.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./'));

    return stream;
});

// Build examples from templates
gulp.task('swig', function(){
    var stream = gulp.src('src/html/**/*.html')
        .pipe(swig())
        .pipe(gulp.dest('./dist'));

    return stream;
});

// Move vendor files to dest
gulp.task('vendor', function(){
    var stream = gulp.src('src/vendor/**/*.*')
        .pipe(gulp.dest('./dist'));

    return stream;
});

// Clean build
gulp.task('clean', function() {
    var stream = gulp.src([
            'dist',
            'base.css',
            'base.min.css'
        ])
        .pipe(clean({force: true}));

    return stream;
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/html/**/*.html', ['swig']);
    gulp.watch('src/js/**/*.js', ['js']);
});

// Default Task
gulp.task('default', ['sass', 'swig', 'vendor', 'watch']);