// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var rimraf = require('rimraf');
var autoprefixer = require('gulp-autoprefixer');
var es = require('event-stream');
var	concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var order = require('gulp-order');

var srcDir = './src';
var distDir = './dist';

gulp.task('styles', function() {

    var vendorFiles = gulp.src('bower_components/flexboxgrid/dist/flexboxgrid.min.css');

    var appFiles = gulp.src('./src/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed', includePaths: ['bower_components/Skeleton-Sass/scss/']}).on('error', sass.logError));

    return es.concat(vendorFiles, appFiles)
        .pipe(concat('./bundle.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {

    var jsFilter = gulpFilter('*.js');
    var vendorFiles = gulp.src(mainBowerFiles().concat(['vendor/mqttws31.js']))
        .pipe(jsFilter)
        .pipe(concat('vendor.js'));

    var appFiles = gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(order([
            'src/js/app.module.js',
            'src/js/app.route.js',
            '*'
        ]))
        .pipe(concat('app.js'));

    return es.concat(vendorFiles, appFiles)
        .pipe(order([
            'vendor.js',
            'app.js'
        ]))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// tasks
gulp.task('lint', function() {
    gulp.src(['./src/**/*.js', '!./bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function (cb) {
    rimraf('./dist', cb);
});

gulp.task('copy-html-files', function () {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-config', function () {
    gulp.src('./src/config.json')
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', function () {
    connect.server({
        root: 'dist/',
        port: 8888
    });
});


// default task
gulp.task('default',
    ['lint']
);
gulp.task('build', function() {
    runSequence(
        ['clean'],
        ['lint', 'styles', 'scripts', 'copy-config', 'copy-html-files']
    );
});