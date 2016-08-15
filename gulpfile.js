var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var glob = require('glob');
var sass = require('gulp-sass');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react', 'react-dom', 'history', 'query-string', 'autobind-decorator', 'lz-string', 'react-router'
];

var browserifyTask = function (options) {

  // Our app bundler
  var appBundler = browserify({
      entries: [options.src], // Only need initial file, browserify finds the rest
  transform: [babelify.configure({plugins: ['transform-decorators-legacy'], presets: ['es2015', 'stage-1', 'react']})], // We want to convert JSX to normal javascript
      debug: options.development, // Gives us sourcemapping
      cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
  });

  // We set our dependencies as externals on our app bundler when developing
  (options.development ? dependencies : []).forEach(function (dep) {
      appBundler.external(dep);
  });

  // The rebundle process
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, reload({stream:true})))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  // Fire up Watchify when developing
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }

  rebundle();

  // We create a separate bundle for our dependencies as they
  // should not rebundle on file changes. This only happens when
  // we develop. When deploying the dependencies will be included
  // in the application bundle
  if (options.development) {

    var vendorsBundler = browserify({
      debug: true,
      require: dependencies
    });

    // Run the vendor bundle
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));

  }

}

var cssTask = function (options) {
    if (options.development) {
      var run = function () {
        console.log(arguments);
        var start = new Date();
        console.log('Building CSS bundle');
        gulp.src(options.src)
          .pipe(sass().on('error', sass.logError))
          .pipe(concat('main.css'))
          .pipe(gulp.dest(options.dest))
          .pipe(reload({stream:true}))
          .pipe(notify(function () {
            console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
          }));
      };
      run();
      gulp.watch(options.src, run);
    } else {
      gulp.src(options.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(options.dest));
    }
};

// Starts our development workflow
gulp.task('default', function () {
  browserifyTask({
    development: true,
    src: './app/main.js',
    dest: './build'
  });

  cssTask({
    development: true,
    src: './styles/**/*.scss',
    dest: './build'
  });

  browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server : {
          baseDir: './build/',
          routes: {
            '/html_preview/': './build/'
          }
        },
        middleware : [ historyApiFallback() ],
        ghostMode: false
    });

});

gulp.task('deploy', function () {

  process.env.NODE_ENV = 'production';

  browserifyTask({
    development: false,
    src: './app/main.js',
    dest: './dist'
  });

  cssTask({
    development: false,
    src: './styles/**/*.scss',
    dest: './dist'
  });

});