var path = require('path');

module.exports = {
  entry: "./app/assets/scripts/main.js",
  output: {
    path: path.resolve(__dirname, "./app/dist/assets/scripts"),
    filename: 'App.js'
  }
}