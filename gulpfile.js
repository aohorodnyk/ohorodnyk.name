let gulp = require('gulp'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    runSequence = require('run-sequence'),
    ghPages = require('gulp-gh-pages');

gulp.task('css', function () {
    return gulp.src("./src/css/*.css")
        .pipe(autoprefixer('last 4 version'))
        .pipe(cssnano())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function () {
    return gulp.src("./src/images/**")
        .pipe(gulp.dest('./public/images'));
});

gulp.task('fonts', function () {
    return gulp.src("./src/fonts/*")
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('files', function () {
    return gulp.src("./src/*")
        .pipe(gulp.dest('./public'));
});

gulp.task('clean-all', function () {
    return del(['./public']);
});

gulp.task('gh-pages', function () {
    return gulp.src('./public/**')
        .pipe(ghPages());
});

gulp.task('build', function (callback) {
    return runSequence(
        'clean-all',
        ['files', 'fonts', 'images', 'css'],
        callback
    );
});

gulp.task('deploy', function (callback) {
    return runSequence('build', 'gh-pages', callback);
});
