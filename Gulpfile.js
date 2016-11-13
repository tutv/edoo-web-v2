'use strict';

var gulp = require('gulp');
var gulpCopy = require('gulp-copy');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var rename = require("gulp-rename");

gulp.task('build', shell.task([
    'ng build --prod'
]));

gulp.task('clean', function () {
    return gulp.src([
        'docs/**/*.*',
        'docs/assets',
        '!docs/CNAME'
    ], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy', ['build', 'clean'], function () {
    return gulp.src([
        'dist/**/*'
    ])
        .pipe(gulpCopy('docs', {prefix: 1}))
});

gulp.task('fix404', ['copy'], function () {
    return gulp.src([
        'docs/index.html'
    ])
        .pipe(rename('404.html'))
        .pipe(gulp.dest('docs'));
});

gulp.task('deploy', ['fix404'], shell.task([
    'git add docs/',
    'echo "Git push to done!"'
]));
