// gulp config obj
const config = require('./../config/gulp');

const serverBlock = require('./../lib/server-block');

// gulp dependencies
const browserify = require('browserify');
const bs = require('browser-sync').create();
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const gutil = require('gulp-util');
const metalsmith = require('./metalsmith');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');

// utilities

// TODO pass bool to toggle maps/minifyGlobalJs
// adds source map data url to file: default = false
const maps = (() => {
  let flag = false;
  return (bool) => {
    if (bool) flag = true;
    return flag;
  };
})();

// minifies *all* es2015 module code: default = true
const minifyGlobalJs = (() => {
  const flag = { global: true };
  return (bool) => {
    if (bool === false) flag.global = false;
    return flag;
  };
})();

function compileCss(options) {
  return gulp.src(options.main)
    .pipe(sass({
      sourceMapEmbed: maps(),
      outputStyle: 'compressed',
      includePaths: ['./node_modules/normalize-scss/sass'],
    }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(options.dest));
}

function compileJs(options) {
  return browserify(options.main, { debug: maps() })
    .transform('babelify', { presets: ['env'] })
    .transform('uglifyify', minifyGlobalJs())
    .bundle()
    .pipe(source(options.src))
    .pipe(buffer())
    .pipe(gulp.dest(options.dest));
}

function deploy(type, done) {
  metalsmith((err) => {
    if (err) return gutil.log(err);
    return serverBlock(type, (res) => {
      gutil.log(res);
      return done();
    });
  });
}

// tasks
gulp.task('css', () => {
  const app = config.css.app;
  return compileCss({
    main: app.main,
    dest: app.dest,
  });
});

gulp.task('js', () => {
  const app = config.js.app;
  return compileJs({
    main: app.main,
    src: app.src,
    dest: app.dest,
  });
});

gulp.task('build', done => metalsmith((err) => {
  if (err) return gutil.log(err);
  bs.reload();
  return done();
}));

gulp.task('staging', ['css', 'js'], done => deploy(config.build.staging, done));

gulp.task('production', ['css', 'js'], done => deploy(config.build.production, done));

gulp.task('development', ['build'], () => {
  const app = {
    css: config.css.app.watch,
    js: config.js.app.watch,
    watch: config.watch,
  };
  maps(true);
  minifyGlobalJs(false);
  bs.init(config.browserSync);
  gulp.watch(app.css, ['css']);
  gulp.watch(app.js, ['js']);
  gulp.watch(app.watch, ['build']);
});
