const gulp = require('gulp'), 
uglify = require('gulp-uglify-es').default,
autoprefixer = require('gulp-autoprefixer'),
rename = require('gulp-rename'),
sass = require('gulp-sass'),
livereload = require('gulp-livereload'),
plumber = require('gulp-plumber');

// scripts task
// uglifies, renames, livereload
gulp.task('scripts', () => {
    gulp.src('app/src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/js'))
        .pipe(livereload());
});

// styles task
// compiles scss, autoprefixes, renames, livereload
gulp.task('styles', () => {
    gulp.src('app/src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/css'))
        .pipe(livereload());
});

// watch styles, scripts tasks
// livereload
gulp.task('watch', () => {
    livereload.listen();
    // watch tasks
    gulp.watch('app/src/scss/**/*.scss', ['styles']);
    gulp.watch('app/src/js/*.js', ['scripts']);
});

gulp.task('default', 
    [
        'scripts',
        'styles',
        'watch'
    ]
);