'use strict';

var container = require('./util/container'),
    traverse = require('./util/traverse'),
    formats = require('./util/formats');

var deref = require('deref');

function generate(schema, refs) {
  var $ = deref();

  try {
    return traverse($(schema, refs), [], function(ref) {
      console.log('DEREF', ref, Object.keys($.refs));
    });
  } catch (e) {
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

generate.formats = formats;
generate.extend = container.set;

module.exports = generate;
