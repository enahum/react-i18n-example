var gulp = require('gulp'),
    clean = require('gulp-rimraf'),
    gulpif = require('gulp-if'),
    browserify = require('gulp-browserify'),
    minifyCss = require('gulp-minify-css'),
    babelify = require('babelify'),
    globify = require('require-globify'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    fs = require('fs'),
    path = require('path'),
    utils = require('./libs/utils')();

function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true });
    src._read = function () {
        this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
        this.push(null)
    };
    return src;
}

gulp.task('minify', function() {
    gulp.src('./public/css/*')
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./public/css/dist/'));

    return gulp.src('./app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true,
            transform: [babelify, globify]
        }))
        .pipe(concat('bundle.js'))
        //.pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('locales', function(done){
    fs.readdirSync('./locales')
    .forEach(function(file){
            var dir = './locales/' + file,
                obj = {};
            if(!fs.lstatSync(dir).isDirectory()) return;

            fs.readdirSync(dir)
            .forEach(function(f) {
                    utils.extend(obj, require(dir + '/' + f));
                });
            string_src(file + '.json', JSON.stringify(obj))
            .pipe(gulp.dest('./public/locales/'));
        });

    done();
});