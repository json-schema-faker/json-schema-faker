// discuss
var bundleName = 'JSONSchemaFaker';

// boilerplate...
var fs = require('fs-extra'),
    path = require('path'),
    glob = require('glob'),
    rollup = require('rollup'),
    commonJs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    template = require('lodash.template');

var buildDir = __dirname,
    projectDir = path.join(__dirname, '..');

var BANNER_TEXT = fs.readFileSync(path.join(buildDir, '.banner.txt')).toString();
var LOCALE_TEXT = fs.readFileSync(path.join(buildDir, '.locale.js')).toString();

var pkg = require(path.join(projectDir, 'package.json')),
    bannerTemplate = template(BANNER_TEXT),
    localeTemplate = template(LOCALE_TEXT);

var banner = bannerTemplate({ pkg: pkg, now: (new Date()).toISOString().replace('T', ' ') });

// custom bundler
function bundle(options) {
  var destFile = path.join(projectDir, 'dist', options.dest || '', options.id + '.js');

  return rollup.rollup({
    input: options.src,
    onwarn() {},
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
      name: bundleName,
    });
  }).then(function(result) {
    var gcc = require('google-closure-compiler-js').compile;

    var min = gcc({
      jsCode: [{ src: result.code }],
      languageIn: 'ECMASCRIPT6',
      languageOut: 'ECMASCRIPT5',
      compilationLevel: 'ADVANCED',
      warningLevel: 'VERBOSE',
      env: 'CUSTOM',
      createSourceMap: false,
      applyInputSourceMaps: false,
    }).compiledCode;

    // minified output
    fs.outputFileSync(destFile.replace(/\.js$/, '.min.js'), min.replace(/JSCOMPILER_PRESERVE\(.*?\)/g, ''));

    // regular output
    fs.outputFileSync(destFile, result.code);

    // OK
    console.log('Bundle: ' + destFile);
  })
  .catch(function(error) {
    console.log(error.stack);
  });
}

Promise.resolve()
.then(() => {
  console.log('Building main library...');

  return bundle({ id: pkg.name, src: path.join(projectDir, 'lib/index.js') });
})
.then(() => {
  // proxied versions from faker's locales
  var languages = glob.sync(path.join(require.resolve('faker'), '../locale/*.js'));

  console.log('Preparing all sources...');

  const tasks = [];

  languages.forEach(function(lang) {
    fs.outputFileSync(path.join(projectDir, 'locale/' + path.basename(lang)), localeTemplate({ lang: path.basename(lang, '.js') }));

    tasks.push(() => {
      console.log('Building language ' + path.basename(lang, '.js') + '...');

      return bundle({ id: path.basename(lang, '.js'), dest: 'locale', src: path.join(projectDir, 'locale/' + path.basename(lang)) });
    });
  });

  return tasks.reduce((prev, cur) => prev.then(() => cur()), Promise.resolve());
})
.then(() => {
  console.log('Done.');
})
.catch(e => {
  console.log(e.stack);
});
