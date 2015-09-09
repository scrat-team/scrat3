var fis = module.exports = require('fis3');
fis.cli.name = 'scrat3';
fis.cli.info = require('./package.json');
fis.require.prefixes.unshift('scrat3', 'scrat');
fis.cli.version = require('./version.js');
//fis.cli.help.commands = [ 'release', 'install', 'server', 'init' ];

//mount scene
fis.seo = fis.pagelet = require('./scene/pagelet');

//alias
Object.defineProperty(global, 'scrat', {
  enumerable : true,
  writable : false,
  value : fis
});
