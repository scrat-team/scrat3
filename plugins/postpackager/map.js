var path = require('path');
var mkdirp = require('mkdirp');

//FIXME: 未生成依赖, 以及其他属性
module.exports = function(ret) {
  var root = fis.project.getProjectPath();
  //create private/log
  mkdirp.sync(path.join(root, 'config'));

  //create config/map.json
  var file = fis.file(root, 'conf/map.json');
  file.setContent(JSON.stringify(ret.map, null, 4));
  ret.pkg[file.subpath] = file;
};