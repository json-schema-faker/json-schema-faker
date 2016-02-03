var fs = require('fs'),
    path = require('path'),
    browserify = require('browserify'),
    template = require('lodash.template');

var BANNER_TEXT = fs.readFileSync(path.join(__dirname, '.banner.txt')).toString();

var pkg = require('./package.json'),
    bannerTemplate = template(BANNER_TEXT);

var banner = bannerTemplate({ pkg: pkg, now: (new Date()).toISOString().replace('T', ' ') });

var destFile = path.join(__dirname, 'dist/' + pkg.name + '.js');

var b = browserify({
  detectGlobals: false,
  insertGlobals: false,
  builtins: false
});

// unfortunately standalone didn't work
var exposeName = 'jsf',
    defaultLocale = 'en';

b.add(path.join(__dirname, 'lib/index.js'), { expose: pkg.name, entry: true });

// this way we can build all locales?
b.require(path.join('faker/locale', defaultLocale), { expose: 'faker' });

// disable chance by default?
b.require(path.join(__dirname, 'stubs/chance.js'), { expose: 'chance' });

b.bundle(function(err, buffer) {
  if (err) {
    throw err;
  }

  // hack the window.jsf variable (we need another kind of export for cdnjs?)
  fs.writeFileSync(destFile, banner + '(function(){' + 'var ' + buffer.toString().trim()
    + ';\nwindow.' + exposeName + '=require("' + pkg.name + '")})();');
});
