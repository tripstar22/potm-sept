const gulp = require('gulp'), 
uglify = require('gulp-uglify-es').default,
autoprefixer = require('gulp-autoprefixer'),
rename = require('gulp-rename'),
sass = require('gulp-sass'),
livereload = require('gulp-livereload'),
imagemin = require('gulp-imagemin'),
pump = require('pump');

// scripts task
// uglifies, renames, livereload
gulp.task('scripts', () => {
        pump([
            gulp.src('app/src/js/*.js'),
            uglify(),
            rename({suffix: '.min'}),
            gulp.dest('app/dist/js'),
            livereload()
        ]);
});

// styles task
// compiles scss, autoprefixes, renames, livereload 
gulp.task('styles', () => {
    pump([
        gulp.src('app/src/scss/*/**.scss'),
        sass({outputStyle: 'compressed'}),
        autoprefixer('last 2 versions'),
        rename({suffix: '.min'}),
        gulp.dest('app/dist/css'),
        livereload()
    ]);
});

// minify images
gulp.task('images', () => {
    pump([
        gulp.src('app/src/img/*'),
        imagemin(),
        gulp.dest('app/dist/img')
    ]);
});

// watch styles, scripts tasks
// livereload
gulp.task('watch', () => {
    const server = livereload({start: true});
    // watch tasks
    gulp.watch('app/src/scss/**/*.scss', ['styles']);
    gulp.watch('app/src/js/*.js', ['scripts']);
    gulp.watch('app/src/img/*', ['images']);
})

gulp.task('default', () => {
    'scripts',
    'styles',
    'images',
    'watch'
});