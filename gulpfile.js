const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const gulpinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
// const notify = require('gulp-notify');

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
  browserSync.watch( 'build', browserSync.reload() );
});

gulp.task('fileinclude', function() {
  gulp.src('./src/index.html')
    .pipe(gulpinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build/'));
    // .pipe( notify({ message: "Html completed"}) );
});

gulp.task('assets', async function() {
  gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts/'));
  gulp.src('./src/img/**/*.*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('lessPack', function() {
  return gulp.src('./src/less/**/*.less')
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('jsPack', function(cb) {
  return gulp.src('./src/js/**/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./build/js', { sourcemaps: true }))
    .pipe(browserSync.reload({stream: true}));
    cb();
});

gulp.task('watch', function(cb) {
	gulp.watch('./src/less/**/*.less', gulp.series('lessPack') );
	gulp.watch('./src/js/**/*.js', gulp.series('jsPack') );
	gulp.watch('./src/fonts/**/*', gulp.series('assets') );
	gulp.watch('./src/img/**/*', gulp.series('assets') );
	gulp.watch('./src/**/*.html').on( 'change' ,gulp.series('fileinclude') );
	gulp.watch('./build/index.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
  gulp.series('assets', 'lessPack', 'jsPack'),
  gulp.parallel('watch', 'serve'),
));
