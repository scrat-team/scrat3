module.exports = function (ret, conf, settings, opt) {
  var framework = fis.config.get('framework');
  framework.res = ret.map.res;
  framework.combo = !!opt.pack;
  framework.hash = fis.util.md5(JSON.stringify(framework));
  ret.map = framework;

  var file = fis.file(fis.project.getProjectPath(), 'config/map.json');
  file.setContent(JSON.stringify(ret.map, null, 4));
  ret.pkg[file.subpath] = file;
};