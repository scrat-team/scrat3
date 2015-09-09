module.exports = function(options){
  require('./common')(options);
  var plugins = {
    swig: require('../plugins/preprocessor/swig.js'),
    pagelet: require('../plugins/postpackager/pagelet.js')
  };

  //分析JS文件中的require
  //TODO: 1. 生成的资源表, 多了extra 2.无需自行define, 但id少了.js
  fis.hook('commonJs');

  //TODO: uae
  fis.match('::package', {
    postpackager: plugins.pagelet
  });

  //下划线开头的文件不发布
  fis.match('**/_*', {
    release: false
  }, true);

  fis.match(/\/README\.md$/i, {
    release: false
  });

  fis.match('**', {
    useMap: false,
    useHash: false,
    useCompile: false
  });

  fis.match('*.tpl', {
    isHtmlLike: true,
    isJsLike: false,
    isSwig: true,
    useMap: true,
    preprocessor: plugins.swig
  });

  fis.match(/^\/components\/(.*)$/i, {
    isMod: true,
    useSprite: true,
    //useMap: true,
    useCompile: true,
    release: '/public/c/$1'
  });

  fis.match(/^\/components\/(.*\.tpl)$/i, {
    url: 'views/c/$1',
    release: '/views/c/$1'
  });

  fis.match(/^\/views\/(.*)$/i, {
    useSprite: true,
    //useMap: true,
    useCompile: true,
    release: '/public/v/$1'
  });

  fis.match(/^\/views\/(.*\.tpl)$/i, {
    url: 'views/$1',
    release: '/views/$1'
  });

  fis.match('/{views,components}/**/*.{js,css}', {
    useMap: true,
    useHash: true,
    useCompile: true
  });

  //剩下的文件
  //fis.match('**', {
  //  useMap: false,
  //  useHash: false,
  //  useCompile: false
  //});

  //在prod环境下，开启各种压缩和打包。
  fis.media('prod')
    .match('/{views,components}/**/*.js', {
      useHash: true,
      optimizer: fis.plugin('uglify-js')
    })
    .match('/{views,components}/**/*.css', {
      useHash: true,
      optimizer: fis.plugin('clean-css')
    })
    .match('*.png', {
      optimizer: fis.plugin('png-compressor')
    });
};