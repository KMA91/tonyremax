var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
const keys = require('./keys.js');

if (process.env.NODE_ENV === 'production'){
  mongoose.connect(keys.mongoURI);
}else{
  mongoose.connect('mongodb://localhost/realestate');
  var models_path = path.join(__dirname, './../models');
  fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
      require(models_path + '/' + file);
    }
  }
});
