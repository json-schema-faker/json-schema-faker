// discuss
var bundleName = 'JSONSchemaFaker';

// boilerplate...
var fs = require('fs-extra'),
    path = require('path'),
    rollup = require('rollup'),
    commonJs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    template = require('lodash.template');

var buildDir = __dirname,
    projectDir = path.join(__dirname, '..');

var BANNER_TEXT = fs.readFileSync(path.join(buildDir, '.banner.txt')).toString();

var pkg = require(path.join(projectDir, 'package.json')),
    bannerTemplate = template(BANNER_TEXT);

var banner = bannerTemplate({ pkg: pkg, now: (new Date()).toISOString().replace('T', ' ') });

// custom bundler
function bundle(options, next) {
  var destFile = path.join(projectDir, 'dist', options.dest || '', options.id + '.js');

  rollup.rollup({
    entry: options.src,
    plugins: [
      {
        resolveId(importee, importer) {
          if (!importer) {
            return importee;
          }

          switch (importee) {
            case 'json-schema-ref-parser':
              return importee;
          }
        },
        load(importee) {
          switch (importee) {
            case 'json-schema-ref-parser':
              return 'export default __DEREQ__("' + importee + '");';
          }
        },
      },
      commonJs(),
      nodeResolve({
        module: true,
        jsnext: true,
        main: true,
        browser: true,
      }),
    ],
  }).then(function(_bundle) {
    return _bundle.generate({
      banner,
      format: 'umd',
      moduleName: bundleName,
    });
  }).then(function(result) {
    function dereq(file) {
      return 'createCommonjsModule(function(module, exports) {'
        + fs.readFileSync(file).toString().replace(/\brequire\b/g, '_dereq_')
        + '});';
    }

    var _bundle = result.code.replace(/__DEREQ__\("(.+?)"\);/g, (_, src) => {
      if (src === 'json-schema-ref-parser') {
        return dereq(require.resolve('json-schema-ref-parser/dist/ref-parser.js'));
      }
    });

    var gcc = require('google-closure-compiler-js').compile;

    var min = gcc({
      jsCode: [{ src: _bundle }],
      languageIn: 'ECMASCRIPT6',
      languageOut: 'ECMASCRIPT5',
      compilationLevel: 'ADVANCED',
      warningLevel: 'VERBOSE',
      env: 'CUSTOM',
      createSourceMap: false,
      applyInputSourceMaps: false,
    }).compiledCode;

    // minified output
    fs.outputFileSync(destFile.replace(/\.js$/, '.min.js'), min);

    // regular output
    fs.outputFileSync(destFile, _bundle);

    // OK
    console.log('Bundle: ' + destFile);

    next();
  })
  .catch(function(error) {
    console.log(error);
  });
}

console.log('Building...');

bundle({ id: pkg.name, src: path.join(projectDir, 'lib/index.js') }, function(err) {
  if (err) {
    throw err;
    return;
  }
});
