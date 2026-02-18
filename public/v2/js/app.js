(function () {
var tpl = function () {
      return { v:4,
  t:[ { t:7,
      e:"div",
      m:[ { n:"class",
          f:"Dropdown f",
          t:13 } ],
      f:[ { t:7,
          e:"div",
          m:[ { n:"class",
              f:"Dropdown--arrow",
              t:13 } ] },
        { t:7,
          e:"select",
          m:[ { n:"class",
              f:"a",
              t:13 },
            { n:"value",
              f:[ { t:2,
                  r:"~/selectedValue" } ],
              t:13 },
            { n:"tabindex",
              f:"-1",
              t:13 } ],
          f:[ { t:4,
              f:[ { t:7,
                  e:"option",
                  f:[ { t:2,
                      r:"." } ] } ],
              n:52,
              r:"~/value" } ] },
        { t:7,
          e:"div",
          m:[ { n:"class",
              f:"Dropdown--value nosl",
              t:13 } ],
          f:[ { t:7,
              e:"input",
              m:[ { n:"type",
                  f:"text",
                  t:13 },
                { n:"input",
                  f:"inputValue",
                  t:70 },
                { n:"keydown",
                  f:"submitValue",
                  t:70 },
                { n:"placeholder",
                  f:[ { t:2,
                      r:"~/label" } ],
                  t:13 } ] } ] },
        { t:7,
          e:"div",
          m:[ { n:"class",
              f:[ "Dropdown--actions nosl ",
                { t:2,
                  x:{ r:[ "~/shouldUpdate" ],
                    s:"_0?\"-show\":\"\"" } } ],
              t:13 } ],
          f:[ { t:4,
              f:[ { t:7,
                  e:"a",
                  m:[ { n:"class",
                      f:"tdn",
                      t:13 },
                    { n:"href",
                      f:"#",
                      t:13 },
                    { n:"click",
                      f:"addValue",
                      t:70 } ],
                  f:[ "Add" ] },
                { t:2,
                  x:{ r:[ "~/hasChanged" ],
                    s:"_0?\" or \":\"\"" } } ],
              n:50,
              r:"~/isNew" },
            " ",
            { t:4,
              f:[ { t:7,
                  e:"a",
                  m:[ { n:"class",
                      f:"tdn",
                      t:13 },
                    { n:"href",
                      f:"#",
                      t:13 },
                    { n:"click",
                      f:"updateValue",
                      t:70 } ],
                  f:[ "Update" ] } ],
              n:50,
              r:"~/hasChanged" },
            " ",
            { t:4,
              f:[ { t:7,
                  e:"a",
                  m:[ { n:"class",
                      f:"tdn",
                      t:13 },
                    { n:"href",
                      f:"#",
                      t:13 },
                    { n:"click",
                      f:"removeValue",
                      t:70 } ],
                  f:[ "Delete" ] } ],
              n:50,
              r:"~/canBeDeleted" } ] } ] } ],
  e:{ "_0?\"-show\":\"\"":function (_0){return(_0?"-show":"");},
    "_0?\" or \":\"\"":function (_0){return(_0?" or ":"");} } };
    };



var EditableDropdown = Ractive.extend({
  isolated: true,
  template: tpl,
  data: function data() {
    return {
      value: [],
      label: '',
      isNew: false,
      hasChanged: false,
      shouldUpdate: false,
      selectedValue: null,
    };
  },
  onrender: function onrender() {
    var this$1 = this;

    var INPUT = this.find('input');

    var _sync = function () {
      this$1.set('value', this$1.get('value'));
      this$1.fire('sync', { setValues: this$1.get('value') });
    };

    var _reset = function () {
      this$1.set('shouldUpdate', true);
      this$1.set('canBeDeleted', true);
      this$1.set('hasChanged', false);
      this$1.set('isNew', false);

      INPUT.focus();
    };

    var _update = function (value) {
      if (value) {
        this$1.set('selectedValue', value);
      }
    };

    this.observe('value', function (newValue) {
      this$1.set('canBeDeleted', newValue.length > 0);
      this$1.set('shouldUpdate', newValue.length > 0);

      if (newValue.length && !INPUT.value) {
        INPUT.value = newValue[newValue.length - 1];
        INPUT.focus();
      }

      if (!newValue.length) {
        INPUT.value = '';
      }
    });

    this.on('addValue', function () {
      if (INPUT.value && this$1.get('value').indexOf(INPUT.value) === -1) {
        this$1.fire('sync', { addValue: INPUT.value });
        this$1.set('selectedValue', INPUT.value);
        this$1.push('value', INPUT.value);

        _reset();
        _sync();
      }

      return false;
    });

    this.on('updateValue', function () {
      var _actual = this$1.get('selectedValue');

      this$1.get('value').forEach(function (value, i) {
        if (value === _actual) {
          this$1.fire('sync', { updateValue: INPUT.value, oldValue: _actual });
          this$1.set(("value." + i), INPUT.value);
        }
      });

      _reset();
      _sync();

      return false;
    });

    this.on('inputValue', function (e) {
      var _value = e.node.value;

      if (!_value) {
        this$1.set('shouldUpdate', false);
        return;
      }

      var _new = this$1.get('value').indexOf(_value) === -1;
      var _actual = this$1.get('selectedValue');
      var _changed = _value !== _actual;

      this$1.set('isNew', _new);
      this$1.set('hasChanged', _actual !== null && _changed);
      this$1.set('shouldUpdate', _new || _changed === false);
      this$1.set('canBeDeleted', !_new && _actual !== null);
    });

    this.observe('selectedValue', function (newValue) {
      if (newValue) {
        this$1.fire('sync', { selectedValue: newValue });
        INPUT.value = newValue;
        INPUT.focus();
      } else {
        INPUT.value = '';
      }
    });

    this.on('removeValue', function () {
      var val = this$1.get('value');
      var key = val.indexOf(this$1.get('selectedValue'));

      this$1.splice('value', key, 1)
        .then(function (ref) {
          var old = ref[0];

          return this$1.fire('sync', { removeValue: old });
      });

      _reset();
      _sync();

      if (!val.length) {
        this$1.set('shouldUpdate', false);
        this$1.set('selectedValue', null);

        INPUT.value = '';

        return false;
      }

      if (key > 0) {
        _update(val[key - 1]);
      } else {
        _update(val[0]);
      }

      return false;
    });

    this.on('submitValue', function (e) {
      switch (e.original.keyCode) {
        case 13:
          e.original.preventDefault();
          this$1.fire('addValue');
        break;

        case 38:
          if (!this$1.get('hasChanged')) {
            var val = this$1.get('value');
            var dec = val.indexOf(this$1.get('selectedValue'));

            if (dec > 0) {
              _update(val[dec - 1]);
            } else {
              _update(val[val.length - 1]);
            }

            return false;
          }
        break;

        case 40:
          if (!this$1.get('hasChanged')) {
            var val$1 = this$1.get('value');
            var inc = val$1.indexOf(this$1.get('selectedValue'));

            if (inc < (val$1.length - 1)) {
              _update(val$1[inc + 1]);
            } else {
              _update(val$1[0]);
            }

            return false;
          }
        break;
      }
    });
  },
});

var tpl$1 = function () {
      return { v:4,
  t:[ { t:7,
      e:"div",
      m:[ { n:"class",
          f:"Dropdown f",
          t:13 } ],
      f:[ { t:7,
          e:"select",
          m:[ { n:"class",
              f:"a",
              t:13 },
            { n:"value",
              f:[ { t:2,
                  r:"~/selectedValue" } ],
              t:13 } ],
          f:[ { t:4,
              f:[ { t:7,
                  e:"option",
                  f:[ { t:2,
                      r:"." } ] } ],
              n:52,
              r:"~/value" } ] },
        { t:7,
          e:"div",
          m:[ { n:"class",
              f:"Dropdown--arrow",
              t:13 } ] },
        { t:7,
          e:"div",
          m:[ { n:"class",
              f:"Dropdown--value nosl",
              t:13 } ],
          f:[ { t:7,
              e:"span",
              m:[ { n:"class",
                  f:"db tr",
                  t:13 } ],
              f:[ { t:2,
                  x:{ r:[ "~/selectedValue",
                      "~/label" ],
                    s:"_0||_1" } } ] } ] } ] } ],
  e:{ "_0||_1":function (_0,_1){return(_0||_1);} } };
    };



var SimpleDropdown = Ractive.extend({
  isolated: true,
  template: tpl$1,
  onrender: function onrender() {
    var this$1 = this;

    this.observe('selectedValue', function (newValue) {
      this$1.fire('sync', newValue);
    });
  },
  setValue: function setValue(selectedValue) {
    this.set('selectedValue', selectedValue);
  }
});

var tpl$2 = function () {
      return { v:4,
  t:[ { t:7,
      e:"div",
      m:[ { n:"class",
          f:"AceEditor f b",
          t:13 } ] } ] };
    };



var AceEditor = Ractive.extend({
  isolated: true,
  template: tpl$2,
  onrender: function onrender() {
    var this$1 = this;

    var editor = ace.edit(this.find('.AceEditor'));

    editor.setTheme('ace/theme/github');
    editor.getSession().setMode('ace/mode/json');
    editor.getSession().setTabSize(2);
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;

    this.observe('value', function (newValue) {
      editor.setValue(newValue || '');
      editor.getSession().getSelection().clearSelection();
    });

    editor.getSession().on('change', function () {
      this$1.fire('sync', editor.getValue());
    });
  },
});

var tpl$3 = function () {
      return { v:4,
  t:[ { t:7,
      e:"div",
      m:[ { n:"class",
          f:"md-flx flx-m",
          t:13 } ],
      f:[ { t:7,
          e:"div",
          m:[ { n:"class",
              f:"flx-a md-cl-6",
              t:13 } ],
          f:[ { t:7,
              e:"div",
              m:[ { n:"class",
                  f:"flx",
                  t:13 } ],
              f:[ { t:7,
                  e:"div",
                  m:[ { n:"class",
                      f:"flx-a",
                      t:13 } ],
                  f:[ { t:7,
                      e:"EditableDropdown",
                      m:[ { n:"sync",
                          f:"setPayload",
                          t:70 },
                        { n:"value",
                          f:[ { t:2,
                              r:"~/savedSchemas" } ],
                          t:13 },
                        { n:"label",
                          f:"Schema identifier, e.g. User",
                          t:13 },
                        { n:"tabindex",
                          f:"1",
                          t:13 } ] } ] },
                { t:4,
                  f:[ { t:7,
                      e:"div",
                      m:[ { n:"class",
                          f:"flx-n ml",
                          t:13 } ],
                      f:[ { t:7,
                          e:"button",
                          m:[ { n:"class",
                              f:"a bu db nosl",
                              t:13 },
                            { n:"click",
                              f:"synchronizeGist",
                              t:70 } ],
                          f:[ "Save as gist" ] } ] } ],
                  n:50,
                  r:"~/hasValues" } ] },
            { t:4,
              f:[ { t:7,
                  e:"div",
                  m:[ { n:"class",
                      f:"mt",
                      t:13 } ],
                  f:[ { t:7,
                      e:"AceEditor",
                      m:[ { n:"value",
                          f:[ { t:2,
                              r:"inputJSON" } ],
                          t:13 },
                        { n:"sync",
                          f:"setContent",
                          t:70 },
                        { n:"tabindex",
                          f:"2",
                          t:13 } ] } ] } ],
              n:50,
              r:"~/hasValues" } ] },
        { t:7,
          e:"div",
          m:[ { n:"class",
              f:"flx-a md-cl-6",
              t:13 } ],
          f:[ { t:7,
              e:"div",
              m:[ { n:"class",
                  f:"sm-flx flx-m",
                  t:13 } ],
              f:[ { t:7,
                  e:"div",
                  m:[ { n:"class",
                      f:"flx-a flx-lt",
                      t:13 } ],
                  f:[ { t:7,
                      e:"SimpleDropdown",
                      m:[ { n:"value",
                          f:[ { t:2,
                              r:"~/availableAssets" } ],
                          t:13 },
                        { n:"sync",
                          f:"loadVersion",
                          t:70 },
                        { n:"label",
                          f:"Loading files...",
                          t:13 },
                        { n:"tabindex",
                          f:"6",
                          t:13 } ] } ] },
                { t:7,
                  e:"div",
                  m:[ { n:"class",
                      f:"flx-a flx-lt",
                      t:13 } ],
                  f:[ { t:7,
                      e:"SimpleDropdown",
                      m:[ { n:"value",
                          f:[ { t:2,
                              r:"~/availableVersions" } ],
                          t:13 },
                        { n:"sync",
                          f:"setVersion",
                          t:70 },
                        { n:"label",
                          f:"Loading versions...",
                          t:13 },
                        { n:"tabindex",
                          f:"7",
                          t:13 } ] } ] },
                { t:4,
                  f:[ { t:7,
                      e:"div",
                      m:[ { n:"class",
                          f:"flx-n",
                          t:13 } ],
                      f:[ { t:7,
                          e:"button",
                          m:[ { n:"class",
                              f:"a f bu db cl-12 nosl",
                              t:13 },
                            { n:"click",
                              f:"generateOutput",
                              t:70 },
                            { n:"tabindex",
                              f:"4",
                              t:13 } ],
                          f:[ "Generate example" ] } ] } ],
                  n:50,
                  r:"~/hasValues" } ] },
            { t:4,
              f:[ { t:7,
                  e:"div",
                  m:[ { n:"class",
                      f:"mt",
                      t:13 } ],
                  f:[ { t:7,
                      e:"AceEditor",
                      m:[ { n:"value",
                          f:[ { t:2,
                              r:"outputJSON" } ],
                          t:13 },
                        { n:"tabindex",
                          f:"5",
                          t:13 } ] } ] } ],
              n:50,
              r:"~/hasValues" } ] } ] },
    { t:7,
      e:"div",
      m:[ { n:"class",
          f:[ "Toast ",
            { t:4,
              f:[ "-show" ],
              r:"showMessage" },
            { t:2,
              r:"classes" } ],
          t:13 } ],
      f:[ { t:7,
          e:"div",
          m:[ { n:"class",
              f:"sm-flx flx-m flx-c",
              t:13 } ],
          f:[ { t:7,
              e:"div",
              m:[ { n:"class",
                  f:"flx-a",
                  t:13 } ],
              f:[ { t:2,
                  r:"logMessage" } ] },
            { t:4,
              f:[ { t:7,
                  e:"div",
                  m:[ { n:"class",
                      f:"flx-n",
                      t:13 } ],
                  f:[ { t:7,
                      e:"button",
                      m:[ { n:"class",
                          f:"a f bu db cl-12 nosl",
                          t:13 },
                        { n:"click",
                          f:"generateOutput",
                          t:70 },
                        { n:"tabindex",
                          f:"6",
                          t:13 } ],
                      f:[ "Retry" ] } ] } ],
              n:50,
              r:"~/hasValues" } ] } ] } ] };
    };

var baseURL = '//api.github.com';



function debounce(ms, fn, ctx) {
  var t;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    clearTimeout(t);
    t = setTimeout(function () {
      fn.apply(ctx, args);
    }, ms);
  };
}

function throttle(ms, fn, ctx) {
  ms = ms || 250;

  var last;
  var t;

  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var now = +new Date();

    if (last && now < last + ms) {
      clearTimeout(t);
      t = setTimeout(function () {
        last = now;
        fn.apply(ctx, args);
      }, ms);
    } else {
      last = now;
      fn.apply(ctx, args);
    }
  };
}

function getUrl(path) {
  var AUTH_ID="9685733337524132a430", AUTH_SECRET="bb8e95e2d20291d29eda90f8a35e0572092b37f9";

  return (baseURL + "/" + path + "?client_id=" + AUTH_ID + "&client_secret=" + AUTH_SECRET);
}

var GISTS = {
  loadFrom: function loadFrom(uri) {
    var tmp = uri.replace('#', '').split('/');

    if (tmp.length === 1) {
      // old style URI-based schema - supported for backward compatibility
      // example: http://json-schema-faker.js.org/#%7B%22type%22%3A%22string%22%2C%22chance%22%3A%7B%22first%22%3A%7B%22nationality%22%3A%22en%22%7D%7D%7D
      return Promise.resolve({
        files: {
          // legacy and ugly
          'schema.json': {
            content: decodeURIComponent(tmp[0]),
          },
        }
      });
    }

    var type = tmp[0];
    var hash = tmp[1];

    switch (type) {
      case 'gist':
        // example: http://json-schema-faker.js.org/#gist/c347f2f6083fe81a1fe43d17b83125d7
        return fetch(getUrl(("gists/" + hash)))
          .then(function (res) { return res.json(); });

      case 'uri':
        // example: http://json-schema-faker.js.org/#uri/%7B%22type%22%3A%22string%22%2C%22chance%22%3A%7B%22first%22%3A%7B%22nationality%22%3A%22en%22%7D%7D%7D
        return Promise.resolve({
          files: {
            Example: {
              content: decodeURIComponent(hash),
            },
          },
        });

      default:
        throw new Error('Unknown storage type');
    }
  },
  save: function save(schemas) {
    var _files = {};

    Object.keys(schemas).forEach(function (key) {
      _files[key] = { content: schemas[key].value };
    });

    return fetch(getUrl('gists'), {
      method: 'POST',
      body: JSON.stringify({
        description: 'JSON Schema created by http://json-schema-faker.js.org',
        files: _files,
      }),
    })
    .then(function (res) { return res.json(); });
  }
};



var SCHEMAS = {};
var CURRENT = {};

var _script;

var app = new Ractive({
  el: '#app',
  template: tpl$3,
  isolated: true,
  components: {
    EditableDropdown: EditableDropdown,
    SimpleDropdown: SimpleDropdown,
    AceEditor: AceEditor,
  },
  data: function data() {
    return {
      libInfo: null,
      hasValues: false,
      savedSchemas: [],
      availableAssets: [],
      availableVersions: [],
      availableActions: [
        { type: 'gist', label: 'Save as Gist' },
        { type: 'uri', label: 'Save as URI' } ],
    };
  },
  onrender: function onrender() {
    var this$1 = this;

    var _selected;
    var _sync;
    var _t;

    var blank = {};

    var _gen = function () {
      this$1.set('outputJSON', '');

      var s = new Date();

      var refs = [];

      Object.keys(SCHEMAS).forEach(function (schema) {
        if (schema !== _selected) {
          refs.push(JSON.parse(SCHEMAS[schema].value));
        }
      });

      if (!SCHEMAS[_selected]) {
        return;
      }

      var schema;

      try {
        schema = JSON.parse(SCHEMAS[_selected].value);
      } catch (e) {
        this$1.fire('logStatus', e.message || e.toString(), ['-error']);
        return;
      }

      this$1.el.classList.add('-dis');

      var syncFake = function () { return new Promise(function (resolve, reject) {
          try { resolve((jsf.sync || jsf)(schema, refs)); }
          catch (e) { reject(e); }
        }); };

      var asyncFake = function () { return (jsf.resolve || jsf)(schema, refs); };

      // try the appropriate version
      (parseFloat(jsf.version) >= 0.5 ? asyncFake : syncFake)()
        .then(function (sample) {
          this$1.el.classList.remove('-dis');
          this$1.set('outputJSON', JSON.stringify(sample, null, 2));
          this$1.fire('logStatus', ("Example generated in " + ((new Date() - s) / 1000) + "s"), ['-success']);
        })
        .catch(function (e) {
          this$1.el.classList.remove('-dis');
          this$1.fire('logStatus', (e.message || e.toString()).substr(0, 200), ['-error']);
        });
    };

    var _save = debounce(500, function () {
      if (_sync) {
        var s = new Date();

        window.localStorage._SCHEMAS = JSON.stringify(SCHEMAS);

        this$1.fire('logStatus', ("Session saved in " + ((new Date() - s) / 1000) + "ms"), ['-success']);
      }
    });

    var _select = function () {
      var _keys = Object.keys(SCHEMAS);

      this$1.set('savedSchemas', _keys);
      this$1.set('hasValues', _keys.length > 0);

      if (_keys.length) {
        _selected = _keys[0];

        this$1.set('inputJSON', SCHEMAS[_keys[0]].value);
      }
    };

    var _loadStorage = function () {
      if (_sync && window.localStorage._SCHEMAS) {
        var _saved = JSON.parse(window.localStorage._SCHEMAS);

        Object.keys(_saved).forEach(function (key) {
          SCHEMAS[key] = _saved[key];
        });

        _select();
      }
    };

    var _onHashChange = function () {
      this$1.el.classList.add('-dis');

      this$1.set('inputJSON', '');
      this$1.set('savedSchemas', []);
      this$1.set('hasValues', false);

      Object.keys(SCHEMAS).forEach(function (key) {
        delete SCHEMAS[key];
      });

      if (location.hash) {
        _sync = false;

        var ref = location.hash.split('/');
        var base = ref[0];
        var hash = ref[1];
        var v = ref[2];

        if (v && CURRENT.version !== v) {
          CURRENT.initialVersion = v;
          this$1.findAllComponents('SimpleDropdown')[1].setValue(v);
          this$1.fire('setVersion', v);
        }

        GISTS.loadFrom(location.hash).then(function (result) {
          Object.keys(result.files).forEach(function (key) {
            SCHEMAS[key] = { value: result.files[key].content };
          });

          _select();

          this$1.el.classList.remove('-dis');
        });
      } else {
        _sync = true;

        _loadStorage();

        this$1.el.classList.remove('-dis');

        if (!Object.keys(SCHEMAS).length) {
          window.location.hash = 'gist/eb11f16c9edccf040c028dc8bd2b1756';
        }
      }
    };

    _onHashChange();

    window.addEventListener('hashchange', _onHashChange);

    fetch('//api.cdnjs.com/libraries/json-schema-faker')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        CURRENT.name = data.name;
        CURRENT.files = data.assets;

        this$1.set('libInfo', CURRENT.info);
        this$1.set('availableVersions', CURRENT.files.map(function (a) { return a.version; }));

        CURRENT.version = CURRENT.files.filter(function (a) { return !/beta|dev|rc/.test(a.version); })[0].version;
        CURRENT.version = CURRENT.initialVersion || CURRENT.version;

        delete CURRENT.initialVersion;

        this$1.findAllComponents('SimpleDropdown')[1].setValue(CURRENT.version);
        this$1.fire('setVersion', CURRENT.version);
      });

    function _load() {
      clearTimeout(_load.t);
      _load.t = setTimeout(function () {
        if (CURRENT.version && CURRENT.file) {
          app.el.classList.add('-dis');

          var s = new Date();

          var _err = function () {
            alert(("Wrong or missing version " + (CURRENT.version) + "!"));
          };

          var _cb = function () {
            window.jsf = window.JSONSchemaFaker || window.jsf;
            window.jsf._loaded = true;
            _gen();

            app.fire('logStatus', ("Loaded '" + (CURRENT.file) + "@" + (CURRENT.version) + "' in " + ((new Date() - s) / 1000) + "ms"), ['-success']);
          };

          delete window.JSONSchemaFaker;
          window.jsf = function () {
            _err();
          };

          if (_script) {
            _script.parentNode.removeChild(_script);
          }

          _script = document.createElement('script');
          _script.addEventListener('load', _cb);
          _script.addEventListener('error', _err);
          _script.src = "//cdnjs.cloudflare.com/ajax/libs/" + (CURRENT.name) + "/" + (CURRENT.version) + "/" + (CURRENT.file);

          document.getElementsByTagName('head')[0].appendChild(_script);
        }
      }, 100);
    }

    this.on('setVersion', function (v) {
      this$1.set('availableAssets', CURRENT.files
        .filter(function (a) { return a.version === v; })[0].files
        .filter(function (f) { return f.indexOf('min') === -1; }));

      CURRENT.version = v;

      _load();
    });

    this.on('loadVersion', function (f) {
      CURRENT.file = f;

      _load();
    });

    this.on('setPayload', function (e) {
      if (e.addValue) {
        SCHEMAS[e.addValue] = {
          value: [
            '{',
            ("  \"id\": \"" + (e.addValue) + "\""),
            '}' ].join('\n')
        };

        _save();

        this$1.set('outputJSON', '');
      }

      if (e.setValues) {
        this$1.set('hasValues', e.setValues.length > 0);

        if (!e.setValues.length) {
          window.history.pushState(null, document.title, '');
        }
      }

      if (e.selectedValue) {
        _selected = e.selectedValue;

        this$1.set('outputJSON', '');
        this$1.set('inputJSON', SCHEMAS[_selected].value);

        if (window.jsf && window.jsf._loaded) {
          _gen();
        }
      }

      if (e.updateValue) {
        SCHEMAS[e.updateValue] = SCHEMAS[e.oldValue];
        SCHEMAS[e.updateValue].value = SCHEMAS[e.updateValue].value
          .replace(/"id"\s*:\s*"(\w+)"/g, function (_, id) {
            if (id === e.oldValue) {
              return ("\"id\": \"" + (e.updateValue) + "\"");
            }

            return _;
          });

        this$1.set('inputJSON', SCHEMAS[e.updateValue].value);

        delete SCHEMAS[e.oldValue];

        _save();
      }

      if (e.removeValue) {
        delete SCHEMAS[e.removeValue];

        _save();
      }
    });

    this.on('setContent', function (value) {
      if (_selected && value) {
        if (value !== SCHEMAS[_selected].value) {
          SCHEMAS[_selected].value = value;
          _save();
        }
      }
    });

    this.on('generateOutput', throttle(500, function (e) {
      e.node.disabled = true;

      _gen();

      e.node.disabled = false;

      return false;
    }));

    this.on('synchronizeGist', function (e) {
      var s = new Date();

      e.node.disabled = true;

      app.el.classList.add('-dis');

      GISTS.save(SCHEMAS).then(function (result) {
        e.node.disabled = false;

        app.el.classList.remove('-dis');

        window.history.pushState(null, document.title, ("#gist/" + (result.id) + "/" + (CURRENT.version)));

        this$1.fire('logStatus', ("Gist saved in " + ((new Date() - s) / 1000) + "s"), ['-success']);
      });

      return false;
    });

    var _x;

    this.on('logStatus', function (message, classList) {
      this$1.set('classes', (" " + (classList.join(' '))));
      this$1.set('logMessage', message);
      this$1.set('showMessage', true);

      clearTimeout(_x);
      _x = setTimeout(function () {
        this$1.set('showMessage', false);
      }, 5000);
    });

    this.fire('logStatus', ("Application loaded in " + ((new Date() - TIME) / 1000) + "ms"), ['-success']);
  },
});

}());
