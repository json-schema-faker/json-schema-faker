var fs = require('fs'),
    path = require('path'),
    browserify = require('browserify'),
    template = require('lodash.template');

var BANNER_TEXT = fs.readFileSync(path.join(__dirname, '.banner.txt')).toString();

var pkg = require('./package.json'),
    bannerTemplate = template(BANNER_TEXT);

var banner = bannerTemplate({ pkg: pkg, now: (new Date()).toISOString().replace('T', ' ') });

var destFile = path.join(__dirname, 'dist/' + pkg.name + '.js');

var b = browserify(path.join(__dirname, 'lib/index.js'), {
  detectGlobals: false,
  insertGlobals: false,
  standalone: 'jsf',
  builtins: false
});

b.bundle(function(err, buffer) {
  if (err) {
    throw err;
  }

  fs.writeFileSync(destFile, banner + buffer.toString());
});
