
var gulp = require('gulp'),

  watch = require('gulp-watch'),

  browsersync = require('browser-sync').create();



//watch

gulp.task('watch', function () {

  console.log('watch ok');



  //browsersync

  browsersync.init({

    notify: false,

    server: {

      baseDir: "app"

    }

  });



  watch('./app/index.html', function () {

    browsersync.reload();

  });

  watch('./app/assets/css/**/*.css', function () {

    gulp.start('cssInject');

  });

  //webpack+ js

  watch('./app/assets/scripts/**/*.js', function () {

    gulp.start('scriptsRefresh');

  });

});



gulp.task('cssInject', ['styles'], function () {

  return gulp.src('./app/dist/assets/css/main.css')

    .pipe(browsersync.stream({ match: '**/*.css' }));

});



gulp.task('scriptsRefresh', ['scripts'], function () {

  browsersync.reload();

});

