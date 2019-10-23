import { GISTS, throttle, debounce } from './_util';

/* global TIME, fetch, jsf */

// https://github.com/google/closure-compiler/issues/1875
window.JSCOMPILER_PRESERVE = () => null;

const SKIP_VERSIONS = [
  '0.5.0-rc13',
  '0.5.0-rc14',
];

const SETTINGS = {};
const SCHEMAS = {};

let _selected;
let _vm;
let _t;

function configureJSF() {
  if (window.jsf && window.jsf.option) {
    window.jsf.option(SETTINGS);
  }
}

function generateOutput() {
  if (!window.jsf) {
    setTimeout(generateOutput, 1000);
    return;
  }

  const s = new Date();
  const refs = [];

  Object.keys(SCHEMAS).forEach(schema => {
    if (schema !== _selected) {
      refs.push(JSON.parse(SCHEMAS[schema].value));
    }
  });

  if (!SCHEMAS[_selected]) {
    return;
  }

  let schema;

  try {
    schema = JSON.parse(SCHEMAS[_selected].value);
  } catch (e) {
    _vm.logStatus(e.message || e.toString(), ['-error']);
    return;
  }

  _vm.$el.classList.add('-dis');

  const syncFake = () =>
    new Promise((resolve, reject) => {
      try {
        resolve((window.jsf.generate || window.jsf.sync || window.jsf)(schema, refs));
      } catch (e) { reject(e); }
    });

  const asyncFake = () => (window.jsf.resolve || window.jsf)(schema, refs);

  // try the appropriate version
  (parseFloat(window.jsf.version) >= 0.5 ? asyncFake : syncFake)()
    .then(sample => {
      _vm.$el.classList.remove('-dis');
      _vm.outputJSON = JSON.stringify(sample, null, 2);
      _vm.logStatus(`Example generated in ${(new Date() - s) / 1000}s`, ['-success']);
    })
    .catch(e => {
      _vm.$el.classList.remove('-dis');
      _vm.logStatus((e.message || e.toString()).substr(0, 200), ['-error']);
    });
}

function saveSession() {
  const s = new Date();

  window.localStorage._SCHEMAS = JSON.stringify(SCHEMAS);

  _vm.logStatus(`Session saved in ${(new Date() - s) / 1000}ms`, ['-success']);
}

function loadSession() {
  const _keys = Object.keys(SCHEMAS);

  _vm.savedSchemas = _keys;
  _vm.hasValues = _keys.length > 0;

  if (_keys.length) {
    _selected = _keys[0];
    _vm.inputJSON = SCHEMAS[_keys[0]].value;
    _vm.$refs.schemas.selectedValue = _selected;
  }

  _vm.$el.classList.remove('-dis');
}

function loadStorage() {
  if (window.localStorage._SCHEMAS) {
    const _saved = JSON.parse(window.localStorage._SCHEMAS);

    Object.keys(_saved).forEach(key => {
      SCHEMAS[key] = _saved[key];
    });
  }

  loadSession();
}

function onHashChange() {
  _vm.$el.classList.add('-dis');
  _vm.inputJSON = '';
  _vm.savedSchemas = [];
  _vm.hasValues = false;

  Object.keys(SCHEMAS).forEach(key => {
    delete SCHEMAS[key];
  });

  if (location.hash) {
    const [,, v] = location.hash.split('/');

    GISTS.loadFrom(location.hash).then(result => {
      Object.keys(result.files).forEach(key => {
        SCHEMAS[key] = { value: result.files[key].content };
      });

      loadSession();
    }).catch(e => {
      _vm.$el.classList.remove('-dis');
      _vm.logStatus(e.message || e.toString(), ['-error']);
    });
  } else {
    loadStorage();
  }
}

function onLoadError() {
  /* eslint-disable no-alert */
  alert('This should not happen! Please reload the page, sorry.');
}

function onLoadEnd(start) {
  if (jsf.extend) {
    jsf.extend('faker', () => window.faker);
    jsf.extend('chance', () => window.chance);
  }

  _vm.logStatus(`Loaded in ${(new Date() - start) / 1000}ms`, ['-success']);

  configureJSF();
  generateOutput();
}

window.addEventListener('hashchange', onHashChange);

function onScripts() {
  clearTimeout(_t);
  _t = setTimeout(() => {
    const s = new Date();

    window.jsf = window.JSONSchemaFaker || window.jsf;
    window.jsf._loaded = true;

    delete window.JSONSchemaFaker;

    if (typeof jsf !== 'undefined')  {
      onLoadEnd(s)
    } else {
      onScripts();
    }
  }, 1000);
}

document.body.addEventListener('change', e => {
  if (e.target.name.indexOf('jsfOptions.') === 0) {
    const option = e.target.name.replace('jsfOptions.', '');

    if (e.target.type === 'checkbox') {
      SETTINGS[e.target.name.substr(11)] = e.target.checked;
    } else {
      if (option === 'random') {
        SETTINGS.random = e.target.value !== '' ? (() => parseFloat(e.target.value)) : Math.random;
      }  else {
        SETTINGS[e.target.name.substr(11)] = e.value;
      }
    }
  }

  configureJSF();
  generateOutput();
});

const matches = location.search && location.search.indexOf('code=') !== -1
  ? location.search.match(/\bcode=([\w]{20})/)[1]
  : null;

if (matches) {
  window.history.replaceState(null, document.title, '/');

  GISTS.auth(matches, () => {
    if (_vm) {
      _vm.$forceUpdate();
    }
  });
}

export default {
  init(ui) {
    _vm = ui;

    setTimeout(() => {
      onScripts();
      onHashChange();
    }, 200);

    _vm.logStatus(`Application loaded in ${(new Date() - TIME) / 1000}ms`, ['-success']);
    _vm.$on('generateOutput', throttle(200, e => {
      e.target.disabled = true;
      generateOutput();
      e.target.disabled = false;
    }));

    _vm.$on('setPayload', e => {
      if (e.addValue) {
        SCHEMAS[e.addValue] = {
          value: [
            '{',
            `  "id": "${e.addValue}"`,
            '}',
          ].join('\n'),
        };

        saveSession();

        _vm.outputJSON = '';
      }

      if (e.setValues) {
        _vm.hasValues = e.setValues.length > 0;

        if (!e.setValues.length) {
          window.history.pushState(null, document.title, '');
        }
      }

      if (e.selectedValue) {
        _selected = e.selectedValue;

        _vm.outputJSON = '';
        _vm.inputJSON = SCHEMAS[_selected].value;

        if (window.jsf && window.jsf._loaded) {
          generateOutput();
        }
      }

      if (e.updateValue) {
        SCHEMAS[e.updateValue] = SCHEMAS[e.oldValue];
        SCHEMAS[e.updateValue].value = SCHEMAS[e.updateValue].value
          .replace(/"id"\s*:\s*"(\w+)"/g, (_, id) => {
            if (id === e.oldValue) {
              return `"id": "${e.updateValue}"`;
            }

            return _;
          });

        _vm.inputJSON = SCHEMAS[e.updateValue].value;

        delete SCHEMAS[e.oldValue];

        saveSession();
      }

      if (e.removeValue) {
        delete SCHEMAS[e.removeValue];

        if (!Object.keys(SCHEMAS).length) {
          window.history.pushState(null, document.title, '#');
        }

        saveSession();
      }
    });

    _vm.$on('inputChange', debounce(200, schema => {
      if (_selected && schema.value) {
        SCHEMAS[_selected].value = JSON.stringify(schema.value);
        generateOutput();
        saveSession();
      }
    }));

    _vm.$on('synchronizeGist', e => {
      const s = new Date();

      e.target.disabled = true;

      _vm.$el.classList.add('-dis');

      GISTS.save(SCHEMAS).then(result => {
        e.target.disabled = false;

        _vm.$el.classList.remove('-dis');
        _vm.logStatus(`Gist saved in ${(new Date() - s) / 1000}s`, ['-success']);

        window.history.pushState(null, document.title, `#gist/${result.id}`);
      }).catch(err => {
        e.target.disabled = false;

        _vm.$el.classList.remove('-dis');
        _vm.logStatus(err.message || err.toString(), ['-error']);
      });

      return false;
    });
  },
};
