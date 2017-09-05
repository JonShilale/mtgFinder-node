module.exports = {
  src: './',
  clean: true,
  ignore: [
    '**/.DS_Store',
    '**/**/readme.md',
    'data/**/*',
    'templates/**/*',
    'js/lib/**/*',
    'js/main.js',
    'sass/**/*'
  ],
  markdown: {
    gfm: true
  },
  metaData: {
    nav: 'data/global-nav.json'
  },
  layouts: {
    engine: 'handlebars',
    directory: './src/templates/',
    partials: './src/templates/partials/'
  },
  transforms: {
    transforms: [{
      pattern: 'pages/**/*',
      by: 1,
      opts: {
        dot: false
      }
    }]
  },
  sitemap: {
    hostname: 'https://www.pestpac.com',
    omitExtension: true,
    omitIndex: true,
  },
  dest: './public'
};
