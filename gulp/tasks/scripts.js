var gulp = require('gulp'),
    webpack = require('webpack');

// SCRIPTS
gulp.task('scripts', function(callback){
  console.log('scripts task ok');

  webpack(require('../../webpack.config.js'), function(err, stats) {
    if(err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
  });
  callback();
});