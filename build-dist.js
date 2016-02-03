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
var exposeName = 'jsf';

b.add(path.join(__dirname, 'lib/index.js'), { expose: pkg.name, entry: true });

// this way we can mock locales and minimal stubs
b.require([
  { file: path.join(__dirname, 'stubs/faker.js'), expose: 'faker' },
  { file: path.join(__dirname, 'stubs/chance.js'), expose: 'chance' },
  { file: path.join(__dirname, 'stubs/randexp.js'), expose: 'randexp' }
]);

b.bundle(function(err, buffer) {
  if (err) {
    throw err;
  }

  fs.writeFileSync(destFile, banner + '(function(){' + 'var ' + buffer.toString().trim()
    + ';window.' + exposeName + '=require("' + pkg.name + '")})();');
});
