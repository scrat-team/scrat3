module.exports = function(options){
  require('./common')(options);

  //TODO: mount plugins
  //TODO: 修改下面的映射, 用新的方式, 简化

  fis.match('map.json', {
    release: 'config/map.json'
  });

  //下划线开头的文件不发布
  fis.match(/\/(components|views)(?=\/).*\/_[^\/]+\.tpl$/, {
    isHtmlLike: true,
    isJsLike: false,
    isSwig: true,
    release: false
  });

  fis.match(/\/(components|views)(?=\/).*\/_[^\/]+$/, {
    isHtmlLike: true,
    isJsLike: false,
    isSwig: true,
    release: false
  });

  fis.match(/\/readme\.md$/i, {
    release: false
  });

  fis.match(/^\/components\/(.*\.tpl)$/i, {
    isHtmlLike: true,
    isJsLike: false,
    isSwig: true,
    useMap: true,
    useDomain: false,
    url: 'views/c/$1',
    release: '/views/c/$1'
  });

  fis.match(/^\/components\/(.*)$/i, {
    isMod: true,
    useSprite: true,
    release: '/public/c/$1'
  });

  fis.match(/^\/views\/(.*\.tpl)$/i, {
    isHtmlLike: true,
    useMap: true,
    isSwig: true,
    useDomain: false,
    url: 'views/$1',
    release: '/views/$1'
  });

  fis.match(/^\/views\/(.*)$/i, {
    useSprite: true,
    release: '/public/v/$1'
  });

  fis.match('**', {
    useMap: false,
    useHash: false,
    useCompile: false
  });
};