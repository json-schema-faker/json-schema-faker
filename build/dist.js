// discuss
var bundleName = 'jsf';

// boilerplate...
var fs = require('fs-extra'),
    path = require('path'),
    glob = require('glob'),
    uglifyjs = require('uglify-js'),
    browserify = require('browserify'),
    template = require('lodash.template');

var buildDir = __dirname,
    projectDir = path.join(__dirname, '..');

var BANNER_TEXT = fs.readFileSync(path.join(buildDir, '.banner.txt')).toString(),
    LOCALE_TEXT = fs.readFileSync(path.join(buildDir, '.locale.js')).toString();

var pkg = require(path.join(projectDir, 'package.json')),
    bannerTemplate = template(BANNER_TEXT),
    localeTemplate = template(LOCALE_TEXT);

var banner = bannerTemplate({ pkg: pkg, now: (new Date()).toISOString().replace('T', ' ') });

// reuse instance later
var b = browserify({
  detectGlobals: false,
  insertGlobals: false,
  builtins: false,
  standalone: bundleName
});

// custom bundler
function bundle(options, next) {
  b.reset();

  var destFile = path.join(projectDir, 'dist', options.dest || '', options.id + '.js');

  if (!options.src) {
    // bundle from generated source
    options.src = path.join(projectDir, options.dest, options.id + '.js');

    fs.outputFileSync(options.src, localeTemplate({ lang: options.id }));
  }

  b.add(path.resolve(options.src), { expose: pkg.name, entry: true });

  b.bundle(function(err, buffer) {
    if (err) {
      return next(err);
    }

    // write out the generated bundle!
    var code = buffer.toString();

    var min = uglifyjs.minify(code, {
      fromString: true,
      compress: true,
      mangle: true,
      filename: options.src,
      output: {
        comments: /^!|^\*!|@preserve|@license|@cc_on/
      }
    });

    // minified output
    fs.outputFileSync(destFile.replace(/\.js$/, '.min.js'), banner + min.code);

    // regular output
    fs.outputFileSync(destFile, banner + code);

    // OK
    console.log('Bundle: ' + destFile);

    next();
  });
}

var outputs = [
  { id: pkg.name, src: projectDir }
];

// proxied versions from faker's locales
var languages = glob.sync(path.join(require.resolve('faker'), '../locale/*.js'));

languages.forEach(function(lang) {
  outputs.push({ id: path.basename(lang, '.js'), dest: 'locale' });
});

console.log('Preparing all sources...');

(function next(err) {
  if (err) {
    throw err;
  }

  var opts = outputs.shift();

  if (opts) {
    bundle(opts, next);
  }
})();
