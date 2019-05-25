var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var del = require('del');
var usemin = require('gulp-usemin');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');

var paths = {
  app: 'app/**/*',
  appHTML: 'app/**/*.html',
  appCSS: 'app/assets/css/*.css',
  appJS: 'app/assets/js/*.js',
  // appJSInject:  'app/assets/js/*.js',
  // appCSSInject: 'app/assets/css/*.css',

  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/assets/css',
  distJS: 'dist/assets/js',
  distCSSInj: 'dist/assets/css/*.css',
  distJSInj: 'dist/assets/js/*.js',

  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/assets/css',
  tmpJS: 'tmp/assets/js',
  tmpCSSInject: 'tmp/assets/css/*.css',
  tmpJSInject: 'tmp/assets/js/**/*.js'
};

/*=============================================
=            DEVELOPMENT           =
=============================================*/
gulp.task('html', function () {
  return gulp.src(paths.appHTML)
    .pipe(gulp.dest(paths.tmp));
})
gulp.task('css', function () {
  return gulp.src(paths.appCSS)
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest(paths.tmpCSS));
})
gulp.task('js', function () {
  return gulp.src(paths.appJS)
    .pipe(gulp.dest(paths.tmpJS));
})
gulp.task('copy', ['html', 'css', 'js']);
gulp.task('inject', ['copy'], function () {
  var css = gulp.src(paths.tmpCSSInject);
  var js = gulp.src(paths.tmpJSInject);

  return gulp.src(paths.tmpIndex)
    .pipe(inject(css, { relative: true }))
    .pipe(inject(js, { relative: true }))
    .pipe(gulp.dest(paths.tmp));
});
gulp.task('serve', ['inject'], function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});
gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.app, ['inject']);
});
gulp.task('default', ['watch']);

/*=====  End of DEVELOPMENT  ======*/

/*=============================================
=           PRODUCTION           =
=============================================*/
gulp.task('html:dist', function () {
  return gulp.src(paths.tmpIndex)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('css:dist', function () {
  return gulp.src(paths.tmpCSSInject)
    .pipe(concat('main.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.distCSS));
});
gulp.task('js:dist', function () {
  return gulp.src(paths.tmpJSInject)
    .pipe(concat('main.min.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.distJS));
});
gulp.task('image:dist', function () {
  return gulp.src(paths.appIMG)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.distIMG));
});
gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist']);

gulp.task('inject:dist', ['copy:dist'], function () {
  var css = gulp.src(paths.distCSSInj);
  var js = gulp.src(paths.distJSInj);

  return gulp.src(paths.distIndex)
    .pipe(inject(css, { relative: true }))
    .pipe(inject(js, { relative: true }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inject:dist']);

/*=====  PRODUCTION END  ======*/

gulp.task('clean', function () {
  return del([paths.tmp, paths.dist]);
});



// gulp.task('optimizeImages', ['deleteDistFolder'], function () {
//   console.log('Build working...');
//   return gulp.src(['./app/assets/images/*'])
//     .pipe(imagemin({
//       progressive: true,
//       interlaced: true,
//       multipass: true
//     }))
//     .pipe(gulp.dest('./dist/assets/images'))
// })


// gulp.task('usemin', ['deleteDistFolder'], function () {
//   return gulp.src('./app/index.html')
//     .pipe(usemin())
//     .pipe(gulp.dest('./dist'));
// })

// gulp.task('build', ['deleteDistFolder'], ['optimizeImages'])