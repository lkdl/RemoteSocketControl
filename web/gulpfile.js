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
var ngHtml2Js = require("gulp-ng-html2js");
var htmlmin = require("gulp-htmlmin");

var srcDir = 'src';
var distDir = 'dist';

gulp.task('styles', function() {

    var vendorFiles = gulp.src('bower_components/flexboxgrid/dist/flexboxgrid.min.css');

    var appFiles = gulp.src(srcDir+'/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed', includePaths: ['bower_components/Skeleton-Sass/scss/']}).on('error', sass.logError));

    return es.concat(vendorFiles, appFiles)
        .pipe(concat('./bundle.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest(distDir+'/css'));
});

gulp.task('scripts', function () {

    // Script vendor files
    var jsFilter = gulpFilter('*.js');
    var vendorFiles = gulp.src(mainBowerFiles().concat(['vendor/mqttws31.js']))
        .pipe(jsFilter)
        .pipe(concat('vendor.js'));

    // App files
    var appFiles = gulp.src(srcDir+'/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(order([
            srcDir+'/js/app.module.js',
            srcDir+'/js/app.route.js',
            '*'
        ]))
        .pipe(concat('app.js'));

    // Partials
    var partials = gulp.src(srcDir+'/partials/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(ngHtml2Js({
            moduleName: 'RemoteSocketControl',
            prefix: ''
        }))
        .pipe(concat('partials.js'));

    return es.concat(vendorFiles, appFiles, partials)
        .pipe(order([
            'vendor.js',
            'app.js',
            'partials.js'
        ]))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distDir+'/js'));
});

gulp.task('lint', function() {
    gulp.src([srcDir+'/**/*.js', '!./bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function (cb) {
    rimraf(distDir, cb);
});

gulp.task('copy-index', function () {
    gulp.src(srcDir+'/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(distDir));
});

gulp.task('copy-config', function () {
    gulp.src(srcDir+'/config.json')
        .pipe(gulp.dest(distDir));
});

gulp.task('serve', function () {
    connect.server({
        root: distDir,
        port: 8888
    });
});

gulp.task('build', function() {
    runSequence(
        ['clean'],
        ['lint', 'styles', 'scripts', 'copy-config', 'copy-index']
    );
});

gulp.task('default',
    ['build']
);