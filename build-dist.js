var fs = require('fs-extra'),
    path = require('path'),
    glob = require('glob'),
    browserify = require('browserify'),
    template = require('lodash.template');

var BANNER_TEXT = fs.readFileSync(path.join(__dirname, '.banner.txt')).toString();

var pkg = require('./package.json'),
    bannerTemplate = template(BANNER_TEXT);

var banner = bannerTemplate({ pkg: pkg, now: (new Date()).toISOString().replace('T', ' ') });

// reuse instance later
var b = browserify({
    detectGlobals: false,
    insertGlobals: false,
    builtins: false,
    standalone: 'jsf'
  });

// custom bundler
function bundle(options, next) {
  b.reset();

  var destFile = path.join(__dirname, 'dist/' + options.id + '.js');

  b.add(path.join(__dirname, 'lib/index.js'), { expose: pkg.name, entry: true });

  // this way we can build all locales?
  if (options.lang) {
    b.require(path.join('faker/locale', options.lang), { expose: 'faker' });
  }

  // disable chance by default?
  if (options.chance === false) {
    b.require(path.join(__dirname, 'stubs/chance.js'), { expose: 'chance' });
  }

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
  { id: pkg.name }
];

// discuss
var withLocales = false,
    withoutChance = false;

if (withLocales) {
  var languages = glob.sync(path.join(require.resolve('faker'), '../locale/*.js'));

  languages.forEach(function(lang) {
    lang = path.basename(lang, '.js');

    outputs.push({ id: path.join(lang, pkg.name), lang: lang, chance: !withoutChance });
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
