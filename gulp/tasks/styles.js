var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssvar = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  mixins = require('postcss-mixins');

gulp.task('styles', function () {
  console.log('styles task ok');
  // var processors = [cssImport, mixins, shortcolors, cssvar,nested, autoprefixer]

  return gulp.src('app/assets/css/main.css')
    .pipe(postcss([cssImport, mixins, cssvar, nested, autoprefixer]))
    .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('app/dist/assets/css'));
});