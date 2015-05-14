'use strict';

var traverse = require('./util/traverse'),
    formats = require('./util/formats');

var deref = require('deref');

function generate(schema, refs) {
  var $ = deref();

  try {
    if (Array.isArray(refs)) {
      return traverse($(schema, refs, true));
    } else {
      $.refs = refs || {};
    }

    return traverse($(schema, true));
  } catch (e) {
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

var container = require('./util/container');

// TODO: shall we move it to a separate module?
function extend(generatorName, fn) {
    var generator = container.get(generatorName);
    container.set(generatorName, fn(generator));
}

generate.formats = formats;

generate.extend = extend;

module.exports = generate;
