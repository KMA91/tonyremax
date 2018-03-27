var fs = require('fs');
var path = require('path');

var models_path = path.join(__dirname, './../../models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});

// Checks for environment settings to use keys
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./prod');
}else{
  module.exports = require('./dev');
}
