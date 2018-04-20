var gulp = require('gulp'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    merge = require('merge-stream'),
    jsValidate = require('gulp-jsvalidate'),
    jshint = require('gulp-jshint'),
    sassLint = require('gulp-sass-lint'),
    addsrc = require('gulp-add-src'),
    minifyCSS = require('gulp-minify-css');

const debug = require('gulp-debug');

var config = {
    bowerPath: './bower_components',
    sassPath: './src/scss',
    distPath: './web',
}

gulp.task('styles', function() {
    merge(
        gulp.src(config.sassPath + '/style.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass({
            includePaths: [
                config.sassPath,
            ]})
            .on('error', notify.onError(function(error) {
                return 'Error: ' + error.message;
            }))
        ),
        gulp.src(config.bowerPath + '/bootstrap/dist/css/bootstrap.css')
    )
    .pipe(concat('style.css'))
    //.pipe(sourcemaps.init())
    //.pipe(minifyCSS())
    //.pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(config.distPath + '/css'));
});

gulp.task('js', function() {
    gulp.src([
        'src/js/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(addsrc([
        config.bowerPath + '/jquery/dist/jquery.js',
        config.bowerPath + '/html2pdf.js/dist/html2pdf.bundle.min.js',
        config.bowerPath + '/clipboard/dist/clipboard.min.js',
        config.bowerPath + '/bootstrap/dist/js/bootstrap.js'
    ]))
    .pipe(jsValidate())
    .on('error', notify.onError(function(error) {
        return 'Error: ' + error.message;
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', notify.onError(function(error) {
        return 'Error: ' + error.message;
    }))
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(config.distPath + '/js'));
});

gulp.task('images', function() {
    gulp.src([
        'src/images/**/*',
    ])
    .pipe(gulp.dest(config.distPath + '/images'));
});

gulp.task('html', function() {
    gulp.src([
        'src/html/**/*',
    ])
    .pipe(gulp.dest(config.distPath + '/'));
});

gulp.task('data', function() {
    gulp.src([
        'src/data/**/*',
    ])
    .pipe(gulp.dest(config.distPath + '/data'));
});

gulp.task('build', function() {
    gulp.start('styles');
    gulp.start('js');
    gulp.start('images');
    gulp.start('html');
    gulp.start('data');
});

gulp.task('default', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/html/**/*', ['html']);
    gulp.watch('src/data/**/*', ['data']);
});

