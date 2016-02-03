// discuss
var bundleName = 'jsf',
    withLocales = true;

// boilerplate...
var fs = require('fs-extra'),
    path = require('path'),
    glob = require('glob'),
    browserify = require('browserify'),
    template = require('lodash.template');

var BANNER_TEXT = fs.readFileSync(path.join(__dirname, '.banner.txt')).toString(),
    LOCALE_TEXT = fs.readFileSync(path.join(__dirname, '.locale.js')).toString();

var pkg = require('./package.json'),
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

  // TODO: uglifyjs --comments --compress --mangle -- dist/json-schema-faker.js > dist/json-schema-faker.min.js

  var destFile = path.join(__dirname, 'dist', options.dest || '', options.id + '.js');

  if (!options.src) {
    // bundle from generated source
    options.src = path.join(__dirname, options.dest, options.id + '.js');

    fs.outputFileSync(options.src, localeTemplate({ lang: options.id }));
  }

  b.add(path.resolve(options.src), { expose: pkg.name, entry: true });

  b.bundle(function(err, buffer) {
    if (err) {
      return next(err);
    }

    // write out the generated bundle!
    fs.outputFileSync(destFile, banner + buffer.toString());

    // OK
    console.log('Bundle: ' + destFile);

    next();
  });
}

var outputs = [
  { id: pkg.name, src: '.' }
];

// proxied versions from faker's locales
if (withLocales) {
  var languages = glob.sync(path.join(require.resolve('faker'), '../locale/*.js'));

  languages.forEach(function(lang) {
    outputs.push({ id: path.basename(lang, '.js'), dest: 'locale' });
  });
}

(function next(err) {
  if (err) {
    throw err;
  }

  var opts = outputs.shift();

  if (opts) {
    bundle(opts, next);
  }
})();
