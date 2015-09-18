'use strict';

var container = require('./util/container'),
    traverse = require('./util/traverse'),
    formats = require('./util/formats');

var deref = require('deref'),
    deepExtend = require('deep-extend');

function pick(obj) {
  return obj[Math.floor(Math.random() * obj.length)];
}

function reduce(obj) {
  if (obj.allOf) {
    obj.allOf.forEach(function(sub) {
      reduce(sub);
      deepExtend(obj, sub);
    });

    delete obj.allOf;

    return;
  }

  var mix = obj.anyOf || obj.oneOf;

  if (!(mix && mix.length)) {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value === 'object' && !(key === 'enum' || key === 'required')) {
        reduce(value);
      }
    }

    return;
  }

  if ((obj.oneOf || obj.anyOf) && mix.length) {
    mix = [pick(mix)];
  }

  delete obj.anyOf;
  delete obj.oneOf;

  var fixed = {};

  mix.forEach(function(value) {
    deepExtend(fixed, value);
  });

  deepExtend(obj, fixed);

  while (obj.anyOf || obj.oneOf) {
    reduce(obj);
  }
}


function generate(schema, refs) {
  var $ = deref();

  try {
    return traverse($(schema, refs), [], reduce);
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
