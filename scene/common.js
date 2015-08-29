module.exports = function(options){
  if(typeof options === 'object'){
    fis.config.merge(options);
  } else {
    fis.config.set('name', options || '');
  }

  //TODO: set default config
  fis.match('::package', {
    postpackager: require('../plugins/postpackager/map.js')
  });
};