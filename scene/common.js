module.exports = function(options){
  if(typeof options === 'object'){
    fis.config.merge(options);
  } else {
    fis.config.set('name', options || '');
  }
};